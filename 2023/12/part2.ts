import read from "https://deno.land/x/read@v0.1.1/mod.ts";
import M from "https://deno.land/x/memz@v0.1.0/mod.ts";

const file = await read();
const start = performance.now();

const count = M((record: string, counts: number[]) => {
    if (record === "") {
        return counts.length ? 0 : 1;;
    }

    if (!counts.length) {
        return record.includes("#") ? 0 : 1;
    }

    let result = 0;

    if (".?".includes(record[0])) {
        result += count(record.slice(1), counts);
    }

    if ("#?".includes(record[0])) {
        if (
            counts[0] <= record.length &&
            (counts[0] === record.length || record[counts[0]] !== "#") &&
            !record.slice(0, counts[0]).includes(".")
        ) {
            result += count(record.slice(counts[0] + 1), counts.slice(1));
        }
    }

    return result;
});

let total = 0;

for (const line of file.split("\n")) {
    const [recordStr, countsStr] = line.split(" ");
    const record = Array(5).fill(recordStr).join("?");
    const counts = Array(5).fill(countsStr.split(",")).flat().map(Number);

    total += count(record, counts);
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", (end - start), "ms");
