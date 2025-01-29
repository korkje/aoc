import read from "jsr:@korkje/read";

const RUNS = 25;

const file = await read();
const start = performance.now();
const nums = file.split(" ").map(Number);

for (let i = 0; i < RUNS; ++i) {
    for (let j = 0; j < nums.length; ++j) {
        const n = nums[j];

        if (n === 0) {
            nums[j] = 1;
            continue;
        }

        const s = `${n}`;
        if (s.length % 2 === 0) {
            const half = s.length / 2;
            const a = s.slice(0, half);
            const b = s.slice(half);
            nums.splice(j, 1, Number(a), Number(b));
            ++j;
            continue;
        }

        nums[j] *= 2024;
    }
}

const end = performance.now();

console.log("answer:", nums.length);
console.log("time:", end - start, "ms");
