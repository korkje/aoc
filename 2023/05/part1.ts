const file = await Deno.readTextFile("./input.txt");
const start = performance.now();

type ToFrom = [to: number, from: number, range: number];

const maps: [to: number, from: number, range: number][][] = [];

const [seedLine, ...sections] = file.split("\n\n");

for (const section of sections) {
    const [, ...lines] = section.split("\n");
    maps.push(lines.map(line => line.split(" ").map(Number) as ToFrom));
}

function walkMap(current: number) {
    outer:
    for (const map of maps) {
        for (const [to, from, range] of map) {
            if (current >= from && current < from + range) {
                current += to - from;
                continue outer;
            }
        }
    }
    
    return current;
}

const [, ...seeds] = seedLine.split(" ").map(Number);

let min = Number.MAX_SAFE_INTEGER;

for (const seed of seeds) {
    const result = walkMap(seed);
    if (result < min) min = result;
}

const end = performance.now();

console.log("answer:", min);
console.log("time:", end - start, "ms");
