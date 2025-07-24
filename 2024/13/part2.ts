import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const div = (n: bigint, d: bigint) => d !== 0n && n % d === 0n ? n / d : null;

let sum = 0n;
for (const puzzle of file.split("\n\n")) {
    let [ax, ay, bx, by, tx, ty] = puzzle.match(/\d+/g)!.map(BigInt);

    tx += 10000000000000n;
    ty += 10000000000000n;

    const a = div(tx * by - ty * bx, ax * by - ay * bx);
    if (a === null) continue;

    const b = div(tx - ax * a, bx);
    if (b === null) continue;

    sum += a * 3n + b;
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
