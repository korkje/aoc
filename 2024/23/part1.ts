import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const computers = new Map<string, string[]>();

for (const line of file.split("\n")) {
    const [a, b] = line.split("-");
    computers.set(a, (computers.get(a) ?? []).concat([b]));
    computers.set(b, (computers.get(b) ?? []).concat([a]));
};

const candidates = new Set<string>();

for (const [a, bs] of computers) {
    if (a[0] !== "t") {
        continue;
    }

    for (const b of bs) {
        for (const c of computers.get(b)!) {
            if (c === a) {
                continue;
            }

            if (computers.get(c)!.includes(a)) {
                candidates.add([a, b, c].sort().join());
            }

        }
    }
}

const end = performance.now();
console.log("answer:", candidates.size);
console.log("time:", end - start, "ms");
