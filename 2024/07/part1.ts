import read from "jsr:@korkje/read";
import ncp from "jsr:@korkje/ncp";

const file = await read();
const start = performance.now();

type Op = (a: number, b: number) => number;
const add: Op = (a: number, b: number) => a + b;
const mul: Op = (a: number, b: number) => a * b;

let sum = 0;
for (const line of file.split("\n")) {
    const [l, ...r] = line.split(/:? /).map(Number);
    const possible = new Array<Op[]>(r.length - 1).fill([add, mul]);

    for (const ops of ncp(...possible)) {
        if (l === ops.reduce((acc, op, i) => op(acc, r[i + 1]), r[0])) {
            sum += l;
            break;
        }
    }
}

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
