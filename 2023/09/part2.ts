import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const sequences: number[][] = [];

for (const line of file.split("\n")) {
    sequences.push(line.split(" ").map(Number));
}

const results: number[] = [];

for (const sequence of sequences) {
    const firsts: number[] = [];

    let current = sequence;
    while (!current.every(_ => _ === 0)) {
        const next: number[] = [];
        for (let i = 1; i < current.length; ++i) {
            next.push(current[i] - current[i - 1]);
        }

        firsts.push(current[0]);
        current = next;
    }

    results.push(firsts.reduceRight((a, b) => b - a));
}

const result = results.reduce((a, b) => a + b);
const end = performance.now();

console.log("answer:", result);
console.log("time:", end - start, "ms");
