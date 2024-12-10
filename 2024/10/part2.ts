import read from "jsr:@korkje/read";
import FIFO from "jsr:@korkje/fifo";

const file = await read();
const start = performance.now();

const grid = file.split("\n").map(l => l.split("").map(c => parseInt(c, 10)));

const w = grid[0].length;
const h = grid.length;

const oob = (x: number, y: number) => x < 0 || x >= w || y < 0 || y >= h;
const dxdy = [[0, 1], [1, 0], [0, -1], [-1, 0]];

let score = 0;
for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
        if (grid[y][x] !== 0) {
            continue;
        }

        const q = new FIFO<[number, number]>(32);
        q.push([x, y]);

        while (q.length) {
            const [cx, cy] = q.shift()!;

            for (const [dx, dy] of dxdy) {
                const nx = cx + dx;
                const ny = cy + dy;

                if (oob(nx, ny) || grid[ny][nx] !== grid[cy][cx] + 1) {
                    continue;
                }

                if (grid[ny][nx] === 9) {
                    ++score;
                    continue;
                }

                q.push([nx, ny]);
            }
        }
    }
}


const end = performance.now();

console.log("answer:", score);
console.log("time:", end - start, "ms");
