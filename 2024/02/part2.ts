import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const isSafe = (nums: number[]): boolean => {
    let dir: number | undefined;

    for (let i = 0; i < nums.length - 1; ++i) {
        const [a, b] = nums.slice(i, i + 2);
        const diff = b - a;
        const abs = Math.abs(diff);

        if (dir === undefined) {
            dir = Math.sign(diff);

            if (dir === 0 || abs > 3) {
                return false;
            }

            continue;
        }

        if (Math.sign(diff) !== dir || abs > 3) {
            return false;
        }
    }

    return true;
};

let safe = 0;

for (const report of file.split("\n")) {
    const nums = report.split(" ").map(Number);

    for (let i = 0; i < nums.length; ++i) {
        if (isSafe(nums.toSpliced(i, 1))) {
            ++safe;
            break;
        }
    }
}

const end = performance.now();

console.log("answer:", safe);
console.log("time:", end - start, "ms");
