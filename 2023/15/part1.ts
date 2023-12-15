import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

function hash(input: string) {
    let current = 0;

    for (let i = 0; i < input.length; i++) {
        current += input.charCodeAt(i);
        current *= 17;
        current %= 256;
    }

    return current;
}

let total = 0;

for (const step of file.split(",")) {
    total += hash(step);
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
