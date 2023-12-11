const file = await Deno.readTextFile("./input.txt");
const start = performance.now();

const lines = file.split("\n");
const height = lines.length;
const width = lines[0].length;

const galaxyRows = new Set<number>();
const galaxyCols = new Set<number>();

const galaxies: [number, number][] = [];
let numGalaxies = 0;

for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.split("").entries()) {
        if (char === "#") {
            galaxyRows.add(y);
            galaxyCols.add(x);
            galaxies.push([x, y]);
            numGalaxies++;
        }
    }
}

const emptyRows = new Set<number>();
const emptyCols = new Set<number>();

for (let x = 0; x < width; x++) {
    if (!galaxyCols.has(x)) {
        emptyCols.add(x);
    }
}

for (let y = 0; y < height; y++) {
    if (!galaxyRows.has(y)) {
        emptyRows.add(y);
    }
}

let total = 0;
const visited = new Set<number>();

function* between(a: number, b: number) {
    [a, b] = [Math.min(a, b), Math.max(a, b)];

    for (let i = a + 1; i < b; ++i) {
        yield i;
    }
}

for (const [id, [x, y]] of galaxies.entries()) {
    visited.add(id);

    for (const [id2, [x2, y2]] of galaxies.entries()) {
        if (visited.has(id2)) {
            continue;
        }
        
        let doubles = 0;

        for (const x3 of between(x, x2)) {
            if (emptyCols.has(x3)) {
                ++doubles;
            }
        }

        for (const y3 of between(y, y2)) {
            if (emptyRows.has(y3)) {
                ++doubles;
            }
        }

        total += Math.abs(x - x2) + Math.abs(y - y2) + doubles * (1_000_000 - 1);
    }
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
