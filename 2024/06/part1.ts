import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const grid = file.split("\n");

const oob = (x: number, y: number) =>
    x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;

const blocked = (x: number, y: number) => grid[y][x] === "#";

const dxdy = [[0, -1], [1, 0], [0, 1], [-1, 0]];

let dir = 0;
let x = 0;
let y = 0;

for (let i = 0; i < grid[0].length; ++i) {
    for (let j = 0; j < grid.length; ++j) {
        if (grid[j][i] === "^") {
            x = i;
            y = j;
        }
    }
}

const next = (x: number, y: number) =>
    [x + dxdy[dir][0], y + dxdy[dir][1]] as const;

const visited = new Set<string>();

while (!oob(x, y)) {
    visited.add(`${x},${y}`);
    let [nx, ny] = next(x, y);

    while (!oob(nx, ny) && blocked(nx, ny)) {
        dir = (dir + 1) % 4;
        [nx, ny] = next(x, y);
    }

    [x, y] = [nx, ny];
}

const end = performance.now();

console.log("answer:", visited.size);
console.log("time:", end - start, "ms");
