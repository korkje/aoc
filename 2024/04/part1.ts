import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const normal = file.split("\n");
const w = normal[0].length;
const rotated: string[] = new Array(w);

for (let i = 0; i < w; ++i) {
    rotated[i] = "";
    for (let j = 0; j < normal.length; ++j) {
        rotated[i] += normal[j][w - i - 1];
    }
}

let count = 0;

for (const variant of [normal, rotated]) {
    for (let i = 0; i < variant.length; ++i) {
        for (let j = 0; j < variant[i].length - 3; ++j) {
            const letters = variant[i].slice(j, j + 4);
            if (letters === "XMAS" || letters === "SAMX") {
                ++count;
            }

            if (i < variant.length - 3) {
                const letters = [0, 1, 2, 3].map((k) => variant[i + k][j + k]).join("");
                if (letters === "XMAS" || letters === "SAMX") {
                    ++count;
                }
            }
        }
    }
}

const end = performance.now();

console.log("answer:", count);
console.log("time:", end - start, "ms");
