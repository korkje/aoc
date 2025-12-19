import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const bananas = new Map<string, number>();

for (const s of file.split("\n").map(Number)) {
    let x = BigInt(s);
    const seen = new Set<string>();
    const deltas: number[] = [];

    for (let i = 0; i < 2000; ++i) {
        const a = Number(x % 10n);
        x = ((x << 6n) ^ x) % 16777216n;
        x = ((x >> 5n) ^ x) % 16777216n;
        x = ((x << 11n) ^ x) % 16777216n;
        const b = Number(x % 10n);

        if (deltas.push(b - a) > 4) {
            const key = deltas.slice(-4).join();
            if (!seen.has(key)) {
                bananas.set(key, (bananas.get(key) ?? 0) + b);
                seen.add(key);
            }
        }
    }
}

const answer = Math.max(...bananas.values());

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
