import read from "jsr:@korkje/read@0.1.2";
import ncp from "jsr:@korkje/ncp@0.2.2";

const file = await read();
const start = performance.now();

const [_, bottom] = file.split("\n\n");

const formulas: Record<string, [string, string, string]> = {};
const zs = new Set<string>();
for (const [a, o, b, _, c] of bottom.split("\n").map(_ => _.split(" "))) {
    formulas[c] = [a, o, b];
    for (const z of [a, b, c].filter(_ => _.startsWith("z"))) {
        zs.add(z);
    }
}

const wire = (c: string, n: number) => c + String(n).padStart(2, "0");

const verify_z = (w: string, n: number) => {
    if (!(w in formulas)) {
        return false;
    }

    let [a, o, b] = formulas[w];

    if (o !== "XOR") {
        return false;
    }

    if (n === 0) {
        [a, b] = [a, b].sort();
        return a === "x00" && b === "y00";
    }

    return (
        (verify_xor(a, n) && verify_carry(b, n)) ||
        (verify_xor(b, n) && verify_carry(a, n))
    );
};

const verify_xor = (w: string, n: number) => {
    if (!(w in formulas)) {
        return false;
    }

    let [a, o, b] = formulas[w];

    if (o !== "XOR") {
        return false;
    }

    [a, b] = [a, b].sort();
    return a === wire("x", n) && b === wire("y", n);
};

const verify_carry = (w: string, n: number): boolean => {
    if (!(w in formulas)) {
        return false;
    }

    let [a, o, b] = formulas[w];

    if (n === 1) {
        if (o === "AND") {
            [a, b] = [a, b].sort();
            return a === "x00" && b === "y00";
        }

        return false;
    }

    if (o !== "OR") {
        return false;
    }

    return (
        (verify_direct_carry(a, n - 1) && verify_recarry(b, n - 1)) ||
        (verify_direct_carry(b, n - 1) && verify_recarry(a, n - 1))
    );
};

const verify_direct_carry = (w: string, n: number) => {
    if (!(w in formulas)) {
        return false;
    }

    let [a, o, b] = formulas[w];

    if (o !== "AND") {
        return false;
    }

    [a, b] = [a, b].sort();
    return a === wire("x", n) && b === wire("y", n);
};

const verify_recarry = (w: string, n: number): boolean => {
    if (!(w in formulas)) {
        return false;
    }

    const [a, o, b] = formulas[w];

    if (o !== "AND") {
        return false;
    }

    return (
        (verify_xor(a, n) && verify_carry(b, n)) ||
        (verify_xor(b, n) && verify_carry(a, n))
    );
};

const verify = (n: number) => verify_z(wire("z", n), n);

const progress = () => {
    let i = 0;

    while (verify(i)) {
        ++i;
    }

    return i;
};

const swaps: string[] = [];

for (let i = 0; i < 4; ++i) {
    const base = progress();
    for (const [a, b] of ncp(Object.keys(formulas), Object.keys(formulas))) {
        if (a === b) {
            continue;
        }

        [formulas[a], formulas[b]] = [formulas[b], formulas[a]];
        if (progress() > base) {
            swaps.push(a, b);
            break;
        }

        [formulas[a], formulas[b]] = [formulas[b], formulas[a]];
    }
}

const answer = swaps.sort().join();

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
