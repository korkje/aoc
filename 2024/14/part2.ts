import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const width = 101;
const height = 103;

const mod = (a: number, b: number) => ((a % b) + b) % b;

const robots: [number, number, number, number][] = file
    .split("\n")
    .map(line => line
        .match(/(-?\d+)/g)!
        .map(Number) as [number, number, number, number]
    );

let seconds = 0;

while (true) {
    const seen = new Set<string>();
    let multiples = false;

    for (const [x, y, vx, vy] of robots) {
        const nx = mod(x + vx * seconds, width);
        const ny = mod(y + vy * seconds, height);

        if (seen.has(`${nx},${ny}`)) {
            multiples = true;
            break;
        }

        seen.add(`${nx},${ny}`);
    }

    if (!multiples) {
        break;
    }

    ++seconds;
}

const end = performance.now();
console.log("answer:", seconds);
console.log("time:", end - start, "ms");
