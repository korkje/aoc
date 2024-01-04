import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const equations: number[][] = [];

for (const line of file.split("\n")) {
    const [x, y, _z, vx, vy, _vz] = line.split("@").flatMap(_ => _.split(",").map(Number));
    const [a, b] = [vy / vx, y - (vy / vx) * x];

    equations.push([a, b, x, vx]);
}

// const range = [7, 27];
const range = [200000000000000, 400000000000000];

let intersections = 0;

for (let i = 1; i < equations.length; ++i) {
    const [a1, b1, x1, vx1] = equations[i];

    for (let j = 0; j < i; ++j) {
        const [a2, b2, x2, vx2] = equations[j];

        if (a1 === a2) {
            continue;
        }

        const x = (b2 - b1) / (a1 - a2);
        const y = a1 * x + b1;

        if ([x, y].some(_ => _ < range[0] || _ > range[1])) {
            continue;
        }

        if ((x - x1) / vx1 < 0 || (x - x2) / vx2 < 0) {
            continue;
        }

        ++intersections;
    }
}

const end = performance.now();

console.log("answer:", intersections);
console.log("time:", end - start, "ms");
