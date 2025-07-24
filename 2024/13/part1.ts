import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

let sum = 0;
for (const puzzle of file.split("\n\n")) {
    const [ax, ay, bx, by, tx, ty] = puzzle.match(/\d+/g)!.map(Number);

    for (let b = Math.floor(Math.min((tx / bx), (ty / by))); b >= 0; --b) {
        const a = (tx - bx * b) / ax;

        if (Number.isInteger(a) && a === (ty - by * b) / ay) {
            sum += a * 3 + b;
            break;
        }
    }
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
