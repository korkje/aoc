import read from "jsr:@korkje/read@0.1.2";
// @ts-types="npm:@types/heap"
import Heap from "npm:heap@0.2.7";

const file = await read();
const start = performance.now();

const grid = file.split("\n");
const width = grid[0].length;
const height = grid.length;
const dxdy = [[0, -1], [1, 0], [0, 1], [-1, 0]];

type State = { cost: number, x: number, y: number, heading: number };
const heap = new Heap<State>((a, b) => a.cost - b.cost);
const seen = new Set<string>();

const push = (cost: number, x: number, y: number, heading: number) => {
    if (grid[y][x] === "#") {
        return;
    }

    const key = `${x},${y},${heading}`;
    if (seen.has(key)) {
        return;
    }

    seen.add(key);
    heap.push({ cost, x, y, heading });
};

push(0, 1, height - 2, 1);
let answer: number = 0;

while (heap.size()) {
    const { cost, x, y, heading } = heap.pop()!;

    if (x === width - 2 && y === 1) {
        answer = cost;
        break;
    }

    const [dx, dy] = dxdy[heading];
    push(cost + 1, x + dx, y + dy, heading);
    push(cost + 1000, x, y, (heading + 1) % dxdy.length)
    push(cost + 1000, x, y, (heading + dxdy.length - 1) % dxdy.length)

}

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
