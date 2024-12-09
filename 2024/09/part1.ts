import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const nums = file.split("").map(c => parseInt(c));
const fs = new Int16Array(nums.reduce((a, b) => a + b, 0));

let i = 0;
for (const [j, n] of nums.entries()) {
    fs.fill(j % 2 === 0 ? j / 2 : -1, i, i + n);
    i += n;
}

for (let i = 0, j = fs.length -1; i < j; ++i) {
    while (fs[j] === -1) --j;
    if (fs[i] === -1) {
        const t = fs[i];
        fs[i] = fs[j];
        fs[j] = t;
    }
}

let sum = 0;
for (let i = 0; fs[i] !== -1; ++i) {
    sum += i * fs[i];
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
