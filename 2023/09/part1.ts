const file = await Deno.readTextFile("./input.txt");
const start = performance.now();

const sequences: number[][] = [];

for (const line of file.split("\n")) {
    sequences.push(line.split(" ").map(Number));
}

const results: number[] = [];

for (const sequence of sequences) {
    const lasts: number[] = [];

    let current = sequence;
    while (!current.every(_ => _ === 0)) {
        const next: number[] = [];
        for (let i = 1; i < current.length; ++i) {
            next.push(current[i] - current[i - 1]);
        }

        lasts.push(current[current.length - 1]);
        current = next;
    }

    results.push(lasts.reduceRight((a, b) => a + b));
}

const result = results.reduce((a, b) => a + b);
const end = performance.now();

console.log("answer:", result);
console.log("time:", end - start, "ms");
