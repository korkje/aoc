import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

let total = 0;
for (const line of file.split("\n")) {
    const [record, countsStr] = line.split(" ");
    const counts = countsStr.split(",").map(Number);
    const unknowns = record.match(/\?/g)?.length ?? 0;

    for (let bits = 0; bits < 2 ** unknowns; ++bits) {
        let j = 0;
        const candidate = record.split("").map(c => c === "?" ? ((bits >> j++) & 1) ? "#" : "." : c).join("");
        const regex = new RegExp(`^\\.*${counts.map(n => Array(n).fill("#").join("")).join("\\.+")}\\.*$`);

        if (candidate.match(regex)) {
            ++total;
        }
    }
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", (end - start), "ms");
