import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const [time, distance] = file.split("\n").map(line => {
    const [, ...values] = line.split(/\s+/);
    return Number(values.join(""));
});

const a = -1;
const b = time;
const c = -distance;
const d = b * b - 4 * a * c;

const low = (-b + Math.sqrt(d)) / (2 * a);
const high = (-b - Math.sqrt(d)) / (2 * a);

const result = Math.floor(high) - Math.ceil(low) + 1;
const end = performance.now();

console.log("answer:", result);
console.log("time:", end - start, "ms");
