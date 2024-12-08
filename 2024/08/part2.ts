import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const width = lines[0].length;
const height = lines.length;

const oob = (x: number, y: number) => x < 0 || y < 0 || x >= width || y >= height;

const freqs = new Map<string, (readonly [number, number])[]>();
const antinodes = new Set<string>();

for (const [i, line] of lines.entries()) {
    for (const [j, char] of line.split("").entries()) {
        if (char === ".") {
            continue;
        }

        antinodes.add(`${j},${i}`);

        if (!freqs.has(char)) {
            freqs.set(char, []);
        }

        for (const [x, y] of freqs.get(char)!) {
            const dx = j - x;
            const dy = i - y;

            for (let k = 1;; ++k) {
                const x1 = x - dx * k;
                const y1 = y - dy * k;

                if (oob(x1, y1)) {
                    break;
                }

                antinodes.add(`${x1},${y1}`);
            }

            for (let k = 1;; ++k) {
                const x2 = j + dx * k;
                const y2 = i + dy * k;

                if (oob(x2, y2)) {
                    break;
                }

                antinodes.add(`${x2},${y2}`);
            }
        }

        freqs.get(char)!.push([j, i]);
    }
}

const end = performance.now();

console.log("answer:", antinodes.size);
console.log("time:", end - start, "ms");
