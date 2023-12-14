import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const height = lines.length;
const width = lines[0].length;

let total = 0;
for (let i = 0; i < width; ++i) {
    const column = Array<string>(height);

    for (let j = 0; j < height; ++j) {
        column[j] = lines[j][i];
    }

    const sorted = column
        .join("").split("#")
        .map(group => group.split("")
            .sort(a => a === "." ? 1 : -1)
            .join("")
        )
        .join("#");

    for (let j = 0; j < height; ++j) {
        if (sorted[j] === "O") {
            total += sorted.length - j;
        }
    }
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
