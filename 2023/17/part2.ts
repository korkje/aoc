import read from "https://deno.land/x/read@v0.1.1/mod.ts";

// @deno-types="npm:@types/heap"
import Heap from "npm:heap@0.2.7";

const file = await read();
const start = performance.now();

const lines = file.split("\n")
const width = lines[0].length;
const height = lines.length;

const oob = (x: number, y: number) => x < 0 || x >= width || y < 0 || y >= height;

const dxdy = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

type State = [
    x: number,
    y: number,
    dx: number,
    dy: number,
    count: number,
    penalty: number,
];

const pq = new Heap<State>((a, b) => a[5] - b[5]);
const visited = new Set<string>();

pq.push([0, 0, 0, 0, 0, 0]);

let winner: number | undefined;

while (!pq.empty()) {
    const state = pq.pop()!;
    const [x, y, dx, dy, count, penalty] = state;

    const key = `${x},${y},${dx},${dy},${count}`;

    if (visited.has(key)) {
        continue;
    }

    visited.add(key);

    if (x === width - 1 && y === height - 1) {
        winner = penalty;
        break;
    }

    for (const [dxx, dyy] of dxdy) {
        if (dxx === -dx && dyy === -dy) {
            continue;
        }

        if (count < 4 && (dxx !== dx && dyy !== dy)) {
            continue;
        }

        if (count >= 10 && dxx === dx && dyy === dy) {
            continue;
        }

        const xx = x + dxx;
        const yy = y + dyy;

        if (oob(xx, yy)) {
            continue;
        }

        pq.push([
            xx, yy,
            dxx, dyy,
            dxx === dx && dyy === dy
                ? count + 1
                : 1,
            penalty + parseInt(lines[yy][xx])
        ]);
    }
}

const end = performance.now();

console.log("answer:", winner);
console.log("time:", end - start, "ms");
