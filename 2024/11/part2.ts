import read from "jsr:@korkje/read";
import M from "jsr:@korkje/memz";

const RUNS = 75;

const file = await read();
const start = performance.now();

const splitsInto = M((n: number, runs: number): number => {
    if (runs === 0) {
        return 1;
    }

    if (n === 0) {
        return splitsInto(1, runs - 1);
    }

    const s = n.toString();
    if (s.length % 2 === 0) {
        const a = +s.slice(0, s.length / 2);
        const b = +s.slice(s.length / 2);
        return splitsInto(a, runs - 1) + splitsInto(b, runs - 1);
    }

    return splitsInto(n * 2024, runs - 1);
}, { keyFn: ([n, runs]) => n * 100 + runs });

const sum = file
    .split(" ")
    .map(n => splitsInto(+n, RUNS))
    .reduce((a, b) => a + b);

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
