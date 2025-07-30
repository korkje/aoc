import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const seconds = 100;
const width = 101;
const height = 103;
const quads = [0, 0, 0, 0];

const mod = (a: number, b: number) => ((a % b) + b) % b;

for (const line of file.split("\n")) {
    const [x, y, vx, vy] = line.match(/(-?\d+)/g)!.map(Number);

    const nx = mod(x + vx * seconds, width);
    const ny = mod(y + vy * seconds, height);

    if (nx === (width - 1) / 2 || ny === (height - 1) / 2) {
        continue;
    }

    const quad =
        (nx < (width - 1) / 2 ? 0 : 1) +
        (ny < (height - 1) / 2 ? 0 : 2);

    ++quads[quad];
}

const end = performance.now();
console.log("answer:", quads.reduce((a, b) => a * b));
console.log("time:", end - start, "ms");
