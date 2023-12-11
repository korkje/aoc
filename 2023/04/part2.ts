import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const copies: number[] = Array(lines.length).fill(1);

for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const [, card] = line.split(":");
    const [winning, have] = card.split("|").map(_ => _.trim().split(/\s+/));
    const wins = have.filter(_ => winning.includes(_)).length;

    for (let j = 0; j < wins; ++j) {
        copies[i + j + 1] += copies[i];
    }
}

const end = performance.now();

console.log("answer:", copies.reduce((a, b) => a + b, 0));
console.log("time: ", end - start, "ms");