import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const stones: number[][] = [];

const velocitiesX = new Map<number, number[]>();
const velocitiesY = new Map<number, number[]>();
const velocitiesZ = new Map<number, number[]>();

for (const line of file.split('\n')) {
    const [x, y, z, vx, vy, vz] = line.split("@").flatMap(_ => _.split(",").map(Number));

    velocitiesX.set(vx, (velocitiesX.get(vx) || []).concat(x));
    velocitiesY.set(vy, (velocitiesY.get(vy) || []).concat(y));
    velocitiesZ.set(vz, (velocitiesZ.get(vz) || []).concat(z));

    stones.push([x, y, z, vx, vy, vz]);
}

function getVelocity(velocities: Map<number, number[]>) {
    const relevant = Array.from(velocities.entries()).filter(([_, positions]) => positions.length > 1);

    outer:
    for (let i = -500; i < 500; ++i) {
        for (const [velocity, positions] of relevant) {
            if ((positions[0] - positions[1]) % (i - velocity) !== 0) {
                continue outer;
            }
        }

        return i;
    }

    throw new Error("No velocity found!");
}

const rvx = getVelocity(velocitiesX);
const rvy = getVelocity(velocitiesY);
const rvz = getVelocity(velocitiesZ);

const results = new Map<number, number>();

outer:
for (let i = 1; i < stones.length; ++i) {
    const [x1, y1, z1, vx1, vy1, vz1] = stones[i];
    const ma = (vy1 - rvy) / (vx1 - rvx);
    const ca = y1 - ma * x1;

    for (let j = 0; j < i; ++j) {
        const [x2, y2, _z2, vx2, vy2, _vz2] = stones[j];

        const mb = (vy2 - rvy) / (vx2 - rvx);
        const cb = y2 - mb * x2;

        const rpx = (cb - ca) / (ma - mb);
        const rpy = ma * rpx + ca;

        const time = (rpx - x1) / (vx1 - rvx);
        const rpz = z1 + (vz1 - rvz) * time;

        const result = rpx + rpy + rpz;

        results.set(result, (results.get(result) || 0) + 1);

        if (results.get(result)! > 10) {
            break outer;
        }
    }
}

let result = 0;
let max = 0;

for (const [key, value] of results) {
    if (value > max) {
        result = Number(key);
        max = value;
    }
}

const end = performance.now();

console.log("answer:", result);
console.log("time:", end - start, "ms");
