import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const numberMap: Record<string, number> = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
};

const toNumber = (x: string) => numberMap[x] ?? parseInt(x);
const reverse = (x: string) => x.split("").reverse().join("");

const numbers = Object.keys(numberMap).join("|");

const forwards = new RegExp(`([1-9]|${numbers})`);
const backwards = new RegExp(`([1-9]|${reverse(numbers)})`);

const values: number[] = [];

for (const line of file.split("\n")) {
    const first = line.match(forwards)![0];
    const last = reverse(reverse(line).match(backwards)![0]);

    const value = 10 * toNumber(first) + toNumber(last);
    values.push(value);
}

const sum = values.reduce((a, b) => a + b, 0);
const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
