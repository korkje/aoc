import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
let count = 0;

for (let i = 1; i < lines.length - 1; ++i) {
    for (let j = 1; j < lines[i].length - 1; ++j) {
        if (lines[i][j] !== "A") {
            continue;
        }

        const a = lines[i - 1][j - 1] + lines[i + 1][j + 1];
        const b = lines[i - 1][j + 1] + lines[i + 1][j - 1];

        if ((a === "MS" || a === "SM") && (b === "MS" || b === "SM")) {
            ++count;
        }
    }
}

const end = performance.now();

console.log("answer:", count);
console.log("time:", end - start, "ms");
