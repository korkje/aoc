import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const grid = file.split("\n");

const oob = (x: number, y: number) =>
    x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;

const blocked = (x: number, y: number) => grid[y][x] === "#";

const dxdy = [[0, -1], [1, 0], [0, 1], [-1, 0]];

let dir = 0;
let sx = 0;
let sy = 0;

for (let i = 0; i < grid[0].length; ++i) {
    for (let j = 0; j < grid.length; ++j) {
        if (grid[j][i] === "^") {
            sx = i;
            sy = j;
        }
    }
}

const next = (x: number, y: number, dir: number) =>
    [x + dxdy[dir][0], y + dxdy[dir][1]] as const;

const path: [number, number, number][] = [];

let x = sx;
let y = sy;
while (!oob(x, y)) {
    path.push([x, y, dir]);
    let [nx, ny] = next(x, y, dir);

    while (!oob(nx, ny) && blocked(nx, ny)) {
        dir = (dir + 1) % 4;
        [nx, ny] = next(x, y, dir);
    }

    [x, y] = [nx, ny];
}

path.shift();

const hasLoop = (x: number, y: number, dir: number, _x: number, _y: number) => {
    const visited = new Set<string>();

    while (!oob(x, y)) {
        visited.add(`${x},${y},${dir}`);
        let [nx, ny] = next(x, y, dir);

        while (!oob(nx, ny) && (blocked(nx, ny) || (nx === _x && ny === _y))) {
            dir = (dir + 1) % 4;
            [nx, ny] = next(x, y, dir);
        }

        [x, y] = [nx, ny];

        if (visited.has(`${x},${y},${dir}`)) {
            return true;
        }
    }

    return false;
};

const previous = (x: number, y: number, dir: number) =>
    [x - dxdy[dir][0], y - dxdy[dir][1]] as const;

const tried = new Set<string>();

let count = 0;

for (const [_x, _y, dir] of path) {
    const [x, y] = previous(_x, _y, dir);

    if (tried.has(`${_x},${_y}`)) {
        continue;
    }

    if (hasLoop(x, y, dir, _x, _y)) {
        ++count;
    }

    tried.add(`${_x},${_y}`);
}

const end = performance.now();

console.log("answer:", count);
console.log("time:", end - start, "ms");
