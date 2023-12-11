import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const numbers: number[] = [];

const reNumber = /\d+/g;
const reSymbol = /[^\.]/g;

const lines = file.split("\n");

for (let i = 0; i < lines.length; ++i) {
    let match;
    while ((match = reNumber.exec(lines[i])) !== null) {
        const { index, 0: { length } } = match;

        // Check above
        if (i > 0) {
            const above = lines[i - 1].substring(index - 1, index + length + 1);
            if (above.match(reSymbol)) {
                numbers.push(Number(match[0]));
                continue;
            }
        }
        // Check below
        if (i < lines.length - 1) {
            const below = lines[i + 1].substring(index - 1, index + length + 1);
            if (below.match(reSymbol)) {
                numbers.push(Number(match[0]));
                continue;
            }
        }
        // Check left
        if (index > 0) {
            const left = lines[i][index - 1];
            if (left.match(reSymbol)) {
                numbers.push(Number(match[0]));
                continue;
            }
        }
        // Check right
        if ((index + length) < lines[i].length - 1) {
            const right = lines[i][index + length];
            if (right.match(reSymbol)) {
                numbers.push(Number(match[0]));
                continue;
            }
        }
    }
}

const sum = numbers.reduce((a, b) => a + b, 0);
const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");