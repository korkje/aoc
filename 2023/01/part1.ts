import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const values: number[] = [];

for (const line of file.split("\n")) {
    const numbers = line.match(/[1-9]/g)!;
    values.push(10 * parseInt(numbers[0]) + parseInt(numbers[numbers.length - 1]));
}

const sum = values.reduce((a, b) => a + b, 0);
const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");