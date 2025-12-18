import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const grid = file.split("\n");
const W = grid[0].length;
const H = grid.length;

let [sx, sy] = [-1, -1];

for (const [y, line] of grid.entries()) {
    const s = line.indexOf("S");
    if (s !== -1) {
        [sx, sy] = [s, y];
        break;
    }
}

const dxdy = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const merge = (ax: number, ay: number) => ([bx, by]: number[]) => [ax + bx, ay + by];

const path = [[sx, sy]];
const route = { [sy * W + sx]: 0 };

while (true) {
    let found = false;
    const [cx, cy] = path.at(-1)!;
    const [px, py] = path.at(-2) ?? [-1, -1];

    for (const [nx, ny] of dxdy.map(merge(cx, cy))) {
        if (grid[ny][nx] !== "#" && (nx !== px || ny !== py)) {
            found = true;
            path.push([nx, ny]);
            route[ny * W + nx] = path.length - 1;
            break;
        }
    }

    if (!found) {
        break;
    }
}

const offsets: number[][] = [];

for (let dx = -20; dx <= 20; ++dx) {
    const rem = 20 - Math.abs(dx);
    for (let dy = -rem; dy <= rem; ++dy) {
        offsets.push([dx, dy]);
    }
}

let total = 0;

for (const [cx, cy] of path) {
    const ps = route[cy * W + cx];

    for (const [nx, ny] of offsets.map(merge(cx, cy))) {
        if (nx < 0 || nx >= W || ny < 0 || ny >= H) {
            continue;
        }

        const d = Math.abs(cx - nx) + Math.abs(cy - ny);

        if ((route[ny * W + nx] ?? 0) - ps - d >= 100) {
            ++total;
        }
    }
}

const end = performance.now();
console.log("answer:", total);
console.log("time:", end - start, "ms");
