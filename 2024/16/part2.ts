import read from "jsr:@korkje/read@0.1.2";
// @ts-types="npm:@types/heap"
import Heap from "npm:heap@0.2.7";

const file = await read();
const start = performance.now();

const grid = file.split("\n");
const width = grid[0].length;
const height = grid.length;
const dxdy = [[0, -1], [1, 0], [0, 1], [-1, 0]];

type Node = { x: number, y: number, parent: Node | null };
type State = { cost: number, node: Node, heading: number };
const heap = new Heap<State>((a, b) => a.cost - b.cost);
const seen = new Map<string, number>();

const push = (cost: number, node: Node, heading: number) => {
    const { x, y } = node;

    if (grid[y][x] === "#") {
        return;
    }

    const key = `${x},${y},${heading}`;
    if ((seen.get(key) ?? Infinity) < cost) {
        return;
    }

    seen.set(key, cost);
    heap.push({ cost, node, heading });
};

push(0, { x: 1, y: height - 2, parent: null }, 1);
let found: number | undefined;
const paths: Node[] = [];

while (heap.size()) {
    const { cost, node, heading } = heap.pop()!;
    const { x, y } = node;

    if (x === width - 2 && y === 1) {
        found ??= cost;
        paths.push(node);
    }

    if (found) {
        if (cost > found) {
            break;
        }
        continue;
    }

    const [dx, dy] = dxdy[heading];
    push(cost + 1, { x: x + dx, y: y + dy, parent: node }, heading);
    push(cost + 1000, node, (heading + 1) % dxdy.length)
    push(cost + 1000, node, (heading + dxdy.length - 1) % dxdy.length)
}

const best = new Set<number>();

for (let node of paths) {
    while (node.parent) {
        best.add(node.y * width + node.x);
        node = node.parent;
    }
}

const end = performance.now();
console.log("answer:", best.size + 1);
console.log("time:", end - start, "ms");
