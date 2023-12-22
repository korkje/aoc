import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const bricks: number[][][] = [];

for (const line of file.split("\n")) {
    bricks.push(line.split("~").map(_ => _.split(",").map(Number)));
}

bricks.sort((a, b) => a[0][2] - b[0][2]);

const intersects = (a: number[][], b: number[][]) =>
    Math.max(a[0][0], b[0][0]) <= Math.min(a[1][0], b[1][0]) &&
    Math.max(a[0][1], b[0][1]) <= Math.min(a[1][1], b[1][1]);

for (const [i, brick] of bricks.entries()) {
    let maxZ = 1;

    for (const check of bricks.slice(0, i)) {
        if (intersects(brick, check)) {
            maxZ = Math.max(maxZ, check[1][2] + 1);
        }
    }

    brick[1][2] -= brick[0][2] - maxZ;
    brick[0][2] = maxZ;
}

bricks.sort((a, b) => a[0][2] - b[0][2]);

const supporter = new Map<number, Set<number>>();
const supported = new Map<number, Set<number>>();

for (let i = 0; i < bricks.length; ++i) {
    supporter.set(i, new Set());
    supported.set(i, new Set());
}

for (const [i, top] of bricks.entries()) {
    for (const [j, bottom] of bricks.slice(0, i).entries()) {
        if (intersects(bottom, top) && top[0][2] === bottom[1][2] + 1) {
            supporter.get(j)!.add(i);
            supported.get(i)!.add(j);
        }
    }
}

let total = 0;

outer:
for (let i = 0; i < bricks.length; ++i) {
    for (const j of supporter.get(i)!) {
        if (supported.get(j)!.size < 2) {
            continue outer;
        }
    }

    ++total;
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
