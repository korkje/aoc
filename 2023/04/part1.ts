const file = await Deno.readTextFile("./input.txt");
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