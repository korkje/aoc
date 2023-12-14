import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

function rotateL(lines: string[]): string[] {
    const height = lines.length;
    const width = lines[0].length;

    const rotated = new Array<string>(width);

    for (let i = width - 1; i >= 0; --i) {
        const column = new Array<string>(height);

        for (let j = 0; j < height; ++j) {
            column[j] = lines[j][i];
        }

        rotated[width - i - 1] = column.join("");
    }

    return rotated;
}

function rotateR(lines: string[]): string[] {
    const height = lines.length;
    const width = lines[0].length;

    const rotated = new Array<string>(width);

    for (let i = 0; i < width; ++i) {
        const column = new Array<string>(height);

        for (let j = height - 1; j >= 0; --j) {
            column[height - j - 1] = lines[j][i];
        }

        rotated[i] = column.join("");
    }

    return rotated;
}

function roll(lines: string[]): string[] {
    const height = lines.length;

    const rolled = new Array<string>(height);

    for (let i = 0; i < height; ++i) {
        const sorted = lines[i]
            .split("#")
            .map(group => group.split("")
                .sort(a => a === "." ? 1 : -1)
                .join("")
            )
            .join("#");

        rolled[i] = sorted;
    }

    return rolled;
}

function cycle(lines: string[]): string[] {
    for (let i = 0; i < 4; ++i) {
        lines = roll(lines);
        lines = rotateR(lines);
    }

    return lines;
}

function score(lines: string[]): number {
    const height = lines.length;
    const width = lines[0].length;

    let total = 0;

    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            if (lines[i][j] === "O") {
                total += width - j;
            }
        }
    }

    return total;
}

const CYCLES = 1_000_000_000;

const seen = new Set<string>();
const cycles: string[][] = [];

let current = roll(rotateL(file.split("\n")));

seen.add(current.join(""));
cycles.push(current);

while (true) {
    current = cycle(current);
    const key = current.join("");

    if (seen.has(key)) {
        break;
    }

    seen.add(key);
    cycles.push(current);
}

const cycleStart = cycles.findIndex(c => c.join("") === current.join(""));
const cycleLength = cycles.length - cycleStart;

const remaining = CYCLES - (cycleStart + cycleLength);

for (let i = 0; i < remaining % cycleLength; ++i) {
    current = cycle(current);
}

const end = performance.now();

console.log("answer:", score(current));
console.log("time:", end - start, "ms");
