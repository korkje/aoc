import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const scores: number[] = [];

for (const line of file.split("\n")) {
    const [, card] = line.split(":");
    const [winning, have] = card.split("|").map(_ => _.trim().split(/\s+/));
    const wins = have.filter(_ => winning.includes(_)).length;

    if (wins > 0) {
        scores.push(2 ** (wins - 1));
    }
}

const end = performance.now();

console.log("answer:", scores.reduce((a, b) => a + b, 0));
console.log("time:", end - start, "ms");