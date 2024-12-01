import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();
const lines = file.split("\n");

const left = new Array<number>(lines.length);
const appearances = new Map<number, number>();

for (let i = 0; i < lines.length; i++) {
    const [l, r] = lines[i].split(/\s+/).map(Number);
    left[i] = l;
    appearances.set(r, (appearances.get(r) ?? 0) + 1);
}

let sum = 0;
for (const l of left) {
    const a = appearances.get(l) ?? 0;
    sum += l * a;
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
