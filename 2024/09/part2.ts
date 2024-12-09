import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const fs: [number, number][] = [];

for (const [i, c] of file.split("").entries()) {
    fs.push([i % 2 === 0 ? i / 2 : -1, parseInt(c)]);
}

const m = new Array<number>(10).fill(1);

for (let i = fs.length - 1; i > m[1]; --i) {
    if (fs[i][0] === -1) continue;
    const need = fs[i][1];

    for (let j = m[need] ?? i; j < i; ++j) {
        if (fs[j][0] !== -1) continue;
        const free = fs[j][1];

        if (free === need) {
            fs.splice(j, 1, fs.splice(i, 1, [-1, need])[0]);
            m[need] = j + 2;
            break;
        }
        else if (free > need) {
            const d = free - need;
            fs[j][1] = d;
            fs.splice(j, 0, fs.splice(i, 1, [-1, need])[0]);
            m[free] = j + 3;
            break;
        }
    }
}

let i = 0;
let sum = 0;
for (const [j, n] of fs) {
    if (j !== -1) {
        sum += (n * (i + i + n - 1) / 2) * j;
    }
    i += n;
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
