import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const height = lines.length;
const width = lines[0].length;

const galaxyRows = new Set<number>();
const galaxyCols = new Set<number>();

const galaxies: [number, number][] = [];

for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if (lines[y][x] === "#") {
            galaxyRows.add(y);
            galaxyCols.add(x);
            galaxies.push([x, y]);
        }
    }
}

const emptyRowsLT: number[] = [];
const emptyColsLT: number[] = [];

let emptyRowsFound = 0;
for (let y = 0; y < height; ++y) {
    if (!galaxyRows.has(y)) {
        ++emptyRowsFound;
    }
    else {
        emptyRowsLT[y] = emptyRowsFound;
    }
}

let emptyColsFound = 0;
for (let x = 0; x < width; ++x) {
    if (!galaxyCols.has(x)) {
        ++emptyColsFound;
    }
    else {
        emptyColsLT[x] = emptyColsFound;
    }
}

let total = 0;

for (let id = 0; id < galaxies.length; ++id) {
    const [x, y] = galaxies[id];
    for (let id2 = id + 1; id2 < galaxies.length; ++id2) {
        const [x2, y2] = galaxies[id2];
        const empties = Math.abs(emptyRowsLT[y] - emptyRowsLT[y2]) + Math.abs(emptyColsLT[x] - emptyColsLT[x2]);
        total += Math.abs(x - x2) + Math.abs(y - y2) + empties;
    }
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
