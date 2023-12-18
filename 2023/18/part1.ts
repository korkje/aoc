import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const dug = new Set<string>();
const current = [0, 0];
dug.add(`${current[0]},${current[1]}`);

const directions: Record<string, [number, number]> = {
    "R": [1, 0],
    "D": [0, 1],
    "L": [-1, 0],
    "U": [0, -1],
};

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

for (const line of file.split("\n")) {
    const [direction, distance] = line.split(" ");

    for (let i = 0; i < parseInt(distance); ++i) {
        const [dx, dy] = directions[direction];
        current[0] += dx;
        current[1] += dy;

        [minX, maxX] = [Math.min(minX, current[0]), Math.max(maxX, current[0])];
        [minY, maxY] = [Math.min(minY, current[1]), Math.max(maxY, current[1])];

        dug.add(`${current[0]},${current[1]}`);
    }
}

const toCheck: [number, number][] = [];

const dxdy = Object.values(directions);

function check(x: number, y: number) {
    if (x < minX || x > maxX || y < minY || y > maxY) {
        return;
    }

    const key = `${x},${y}`;

    if (outside.has(key)) {
        return;
    }

    if (dug.has(key)) {
        return;
    }

    outside.add(key);

    for (const [dx, dy] of dxdy) {
        toCheck.push([x + dx, y + dy]);
    }
}

const outside = new Set<string>();

for (let x = minX; x <= maxX; x += 2) {
    toCheck.push([x, minY]);
    toCheck.push([x, maxY]);
}

for (let y = minY; y <= maxY; y += 2) {
    toCheck.push([minX, y]);
    toCheck.push([maxX, y]);
}

while (toCheck.length > 0) {
    check(...toCheck.pop()!);
}

const area = (maxX + 1 - minX) * (maxY + 1 - minY) - outside.size;
const end = performance.now();

console.log("answer:", area);
console.log("time:", end - start, "ms");
