import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const W = 70 + 1;
const H = 70 + 1;
const N = 1024;

const incoming = file.split("\n").map(_ => _.split(",").map(Number)).map(([x, y]) => y * W + x);
const bytes = new Set(incoming.slice(0, N));

const dxdy = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const merge = (ax: number, ay: number) => ([bx, by]: number[]) => [ax + bx, ay + by];

const queue = [[0, 0, 0]];
const seen = new Set([0]);
let answer: number | undefined;

while (queue.length) {
    const [steps, x, y] = queue.shift()!;

    if (x === W - 1 && y === H - 1) {
        answer = steps;
        break;
    }

    for (const [nx, ny] of dxdy.map(merge(x, y))) {
        const key = ny * W + nx;
        if (nx < 0 || nx >= W || ny < 0 || ny >= H || bytes.has(key) || seen.has(key)) {
            continue;
        }

        queue.push([steps + 1, nx, ny]);
        seen.add(key)
    }
}

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
