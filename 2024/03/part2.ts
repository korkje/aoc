import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const sum = file
    .replaceAll(/don't\(\).+?(do\(\)|$)/gs, "")
    .matchAll(/mul\((\d+),(\d+)\)/g)
    .reduce((acc, [, a, b]) => acc + parseInt(a) * parseInt(b), 0);

const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
