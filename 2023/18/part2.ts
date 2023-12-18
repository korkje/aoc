import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const dxdy: Record<string, [number, number]> = {
    "0": [1, 0],
    "1": [0, 1],
    "2": [-1, 0],
    "3": [0, -1],
};

const vertices: [number, number][] = [[0, 0]];
let perimeter = 0;

for (const line of file.split("\n")) {
    const [, distanceStr, direction] = line.match(/\(\#([a-z0-9]+)(\d)\)/)!;

    const [x, y] = vertices[vertices.length - 1];
    const [dx, dy] = dxdy[direction];

    const distance = parseInt(distanceStr, 16);
    perimeter += distance;

    vertices.push([x + dx * distance, y + dy * distance]);
}

let area = 0;
for (let i = 0; i < vertices.length; ++i) {
    const current = vertices[i];
    const next = vertices[i + 1] ?? vertices[0];
    area += current[0] * next[1] - next[0] * current[1];
}

area = Math.abs(area) / 2;
const outer = area + (perimeter / 2) + 1;

const end = performance.now();

console.log("answer:", outer);
console.log("time:", end - start, "ms");
