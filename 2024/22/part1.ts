import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const secret = (n: number) => (s: number) => {
    let x = BigInt(s);
    for (let i = 0; i < n; ++i) {
        x = ((x << 6n) ^ x) % 16777216n;
        x = ((x >> 5n) ^ x) % 16777216n;
        x = ((x << 11n) ^ x) % 16777216n;
    }
    return Number(x);
};

const answer = file.split("\n")
    .map(Number)
    .map(secret(2000))
    .reduce((a, b) => a + b);

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
