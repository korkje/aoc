import read from "jsr:@korkje/read@0.1.2";
import ncp from "jsr:@korkje/ncp@0.2.2";

const file = await read();
const start = performance.now();

const locks: number[][] = [];
const keys: number[][] = [];

file.split("\n\n").map(_ => _.split("\n"))
    .forEach(grid => (grid[0][0] === "#" ? locks : keys).push(
        Array.from({ length: 5 })
        .map((_, x) =>
            Array.from({ length: 5 })
            .filter((_, y) => grid[y + 1][x] === "#")
            .length
        ),
    ));

const answer = ncp(locks, keys)
    .filter(([lock, key]) => lock.every((v, i) => v + key[i] <= 5))
    .toArray()
    .length;

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
