import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const grid = file.split("\n");
const size = grid.length;

const startY = grid.findIndex(row => row.includes("S"));
const startX = grid[startY].indexOf("S");

const dxdy = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const oob = (x: number, y: number) => x < 0 || x >= size || y < 0 || y >= size;

function flood(x: number, y: number, steps: number) {
    let previous = new Set<number>([y * size + x]);

    for (let i = 1; i <= steps; i++) {
        const current = new Set<number>();

        for (const xy of previous) {
            const x = xy % size;
            const y = Math.floor(xy / size);

            for (const [dx, dy] of dxdy) {
                const newX = x + dx;
                const newY = y + dy;

                if (oob(newX, newY)) {
                    continue;
                }

                if (grid[newY][newX] === "#") {
                    continue;
                }

                current.add(newY * size + newX);
            }
        }

        previous = current;
    }

    return previous.size;
}

const steps = 26501365;
const gridsWidth = Math.floor(steps / size) - 1;

const oddGrids = (Math.floor(gridsWidth / 2) * 2 + 1) ** 2;
const evenGrids = (Math.ceil(gridsWidth / 2) * 2) ** 2;

const odd = flood(startX, startY, size);
const even = flood(startX, startY, size - 1);

const fromLeftTopSmall = flood(0, 0, Math.floor(size / 2) - 1);
const fromLeftBottomSmall = flood(0, size - 1, Math.floor(size / 2) - 1);
const fromRightTopSmall = flood(size - 1, 0, Math.floor(size / 2) - 1);
const fromRightBottomSmall = flood(size - 1, size - 1, Math.floor(size / 2) - 1);

const fromLeftTopLarge = flood(0, 0, Math.floor((size * 3) / 2) - 1);
const fromLeftBottomLarge = flood(0, size - 1, Math.floor((size * 3) / 2) - 1);
const fromRightTopLarge = flood(size - 1, 0, Math.floor((size * 3) / 2) - 1);
const fromRightBottomLarge = flood(size - 1, size - 1, Math.floor((size * 3) / 2) - 1);

const fromLeft = flood(0, startY, size - 1);
const fromRight = flood(size - 1, startY, size - 1);
const fromTop = flood(startX, 0, size - 1);
const fromBottom = flood(startX, size - 1, size - 1);

const answer =
    oddGrids * odd +
    evenGrids * even +
    (gridsWidth + 1) * (fromLeftTopSmall + fromLeftBottomSmall + fromRightTopSmall + fromRightBottomSmall) +
    gridsWidth * (fromLeftTopLarge + fromLeftBottomLarge + fromRightTopLarge + fromRightBottomLarge) +
    fromLeft + fromRight + fromTop + fromBottom;


const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
