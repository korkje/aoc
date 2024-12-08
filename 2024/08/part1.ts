import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const width = lines[0].length;
const height = lines.length;

const oob = (x: number, y: number) => x < 0 || y < 0 || x >= width || y >= height;

const freqs = new Map<string, [number, number][]>();
const antinodes = new Set<string>();

for (const [i, line] of lines.entries()) {
    for (const [j, char] of line.split("").entries()) {
        if (char === ".") {
            continue;
        }

        if (!freqs.has(char)) {
            freqs.set(char, []);
        }

        for (const [x, y] of freqs.get(char)!) {
            const dx = j - x;
            const dy = i - y;

            const [x1, y1] = [x - dx, y - dy];
            const [x2, y2] = [j + dx, i + dy];

            if (!oob(x1, y1)) {
                antinodes.add(`${x1},${y1}`);
            }

            if (!oob(x2, y2)) {
                antinodes.add(`${x2},${y2}`);
            }
        }

        freqs.get(char)!.push([j, i]);
    }
}

const end = performance.now();

console.log("answer:", antinodes.size);
console.log("time:", end - start, "ms");
