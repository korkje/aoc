import read from "jsr:@korkje/read@0.1.2";
import M from "jsr:@korkje/memz@0.2.1";

const file = await read();
const start = performance.now();

const [top, bottom] = file.split("\n\n");

const known: Record<string, number> = {};
for (const [k, v] of top.split("\n").map(_ => _.split(": "))) {
    known[k] = Number(v);
}

const unknown: Record<string, [string, string, string]> = {};
const zs = new Set<string>();
for (const [a, o, b, _, c] of bottom.split("\n").map(_ => _.split(" "))) {
    unknown[c] = [a, o, b];
    for (const z of [a, b, c].filter(_ => _.startsWith("z"))) {
        zs.add(z);
    }
}

const operators: Record<string, (a: number, b: number) => number> = {
    "XOR": (a: number, b: number) => a ^ b,
    "OR": (a: number, b: number) => a | b,
    "AND": (a: number, b: number) => a & b,
};

const calc = M((u: string): number => {
    const [a, o, b] = unknown[u];
    return operators[o](calc(a), calc(b));
}, { cache: known, keyFn: ([k]) => k });

const answer = parseInt([...zs].sort().reverse().map(calc).join(""), 2);

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
