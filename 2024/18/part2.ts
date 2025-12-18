import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const W = 70 + 1;
const H = 70 + 1;
const N = 1024;

const incoming = file.split("\n").map(_ => _.split(",").map(Number)).map(([x, y]) => y * W + x);

const dxdy = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const merge = (ax: number, ay: number) => ([bx, by]: number[]) => [ax + bx, ay + by];

const reachable = (bytes: Set<number>) => {
    const queue = [[0, 0]];
    const seen = new Set([0]);

    while (queue.length) {
        const [x, y] = queue.shift()!;
    
        if (x === W - 1 && y === H - 1) {
            return true;
        }
    
        for (const [nx, ny] of dxdy.map(merge(x, y))) {
            const key = ny * W + nx;
            if (nx < 0 || nx >= W || ny < 0 || ny >= H || bytes.has(key) || seen.has(key)) {
                continue;
            }
    
            queue.push([nx, ny]);
            seen.add(key)
        }
    }

    return false;
};

let lo = N;
let hi = incoming.length;

while (lo < hi - 1) {
    const n = Math.floor((lo + hi) / 2);
    if (reachable(new Set(incoming.slice(0, n)))) {
        lo = n;
    }
    else {
        hi = n;
    }
}

const xy = incoming[lo];
const answer = [xy % W, Math.floor(xy / W)].join();

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
