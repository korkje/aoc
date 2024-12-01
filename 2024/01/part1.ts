import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();
const lines = file.split("\n");

const left = new Array<number>(lines.length);
const right = new Array<number>(lines.length);

for (let i = 0; i < lines.length; i++) {
    const [l, r] = lines[i].split(/\s+/).map(Number);
    left[i] = l;
    right[i] = r;
}

const ascending = (a: number, b: number) => a - b;
left.sort(ascending);
right.sort(ascending);

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    sum += Math.abs(left[i] - right[i]);
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
