import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const [times, distances] = file.split("\n").map(line => {
    const [, ...values] = line.split(/\s+/);
    return values.map(Number);
});

const records = times.map((time, i) => [time, distances[i]]);

const scores: number[] = [];

for (const [time, distance] of records) {
    let wins = 0;
    for (let i = 0; i < time; i++) {
        if ((time - i) * i > distance) {
            ++wins;
        }
    }
    scores.push(wins);
}

const result = scores.reduce((a, b) => a * b);
const end = performance.now();

console.log("answer:", result);
console.log("time:", end - start, "ms");
