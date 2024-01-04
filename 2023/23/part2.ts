import read from "https://deno.land/x/read@v0.1.1/mod.ts";
import FIFO from "https://deno.land/x/fifo@v0.2.2/mod.ts";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const width = lines[0].length;
const height = lines.length;

const first = lines[0].indexOf(".");
const last = (height - 1) * width + lines[height - 1].indexOf(".");

const points = new Set<number>([first, last]);

const dxdy = [[0, -1], [1, 0], [0, 1], [-1, 0]];

for (let y = 0; y < height; ++y) {
    const line = lines[y];
    for (let x = 0; x < width; ++x) {
        const char = line[x];

        if (char === "#") {
            continue;
        }

        let neighbors = 0;

        for (const [dx, dy] of dxdy) {
            const x2 = x + dx;
            const y2 = y + dy;

            if (x2 < 0 || x2 >= width || y2 < 0 || y2 >= height) {
                continue;
            }

            if (lines[y2][x2] !== "#") {
                ++neighbors;
            }
        }

        if (neighbors >= 3) {
            points.add(y * width + x);
        }
    }
}

const graph = new Map<number, Map<number, number>>();

for (const xy of points) {
    graph.set(xy, new Map<number, number>());
}

for (const xy of points) {
    const queue = new FIFO<number[]>();
    queue.push([xy, 0]);

    const visited = new Set<number>([xy]);

    while (queue.length) {
        const [xy2, distance] = queue.shift()!;

        if (distance > 0 && points.has(xy2)) {
            graph.get(xy)!.set(xy2, distance);
            continue;
        }

        const [x2, y2] = [xy2 % width, Math.floor(xy2 / width)];
        for (const [dx, dy] of dxdy) {
            const x3 = x2 + dx;
            const y3 = y2 + dy;

            if (x3 < 0 || x3 >= width || y3 < 0 || y3 >= height) {
                continue;
            }

            if (lines[y3][x3] === "#") {
                continue;
            }

            const xy3 = y3 * width + x3;

            if (visited.has(xy3)) {
                continue;
            }

            queue.push([xy3, distance + 1]);
            visited.add(xy3);
        }
    }
}

const ignore = new Set<number>();

function search(point: number) {
    if (point === last) {
        return 0;
    }

    let max = -Infinity;

    ignore.add(point);

    for (const [neighbor, distance] of graph.get(point)!) {
        if (!ignore.has(neighbor)) {
            max = Math.max(max, distance + search(neighbor));
        }
    }

    ignore.delete(point);

    return max;
}

const answer = search(first);

const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
