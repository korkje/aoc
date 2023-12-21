import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const grid = file.split("\n");
const size = grid.length;

const startY = grid.findIndex(row => row.includes("S"));
const startX = grid[startY].indexOf("S");

const dxdy = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const oob = (x: number, y: number) => x < 0 || x >= size || y < 0 || y >= size;

let previous = new Set<number>([startY * size + startX]);

const steps = 26501365;

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

const answer = previous.size;
const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
