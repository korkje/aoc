import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

type Map = [to: number, from: number, range: number];

const mapss: Map[][] = [];

const [seedLine, ...sections] = file.split("\n\n");

for (const section of sections) {
    const [, ...lines] = section.split("\n");

    const map = lines
        .map(line => line.split(" ").map(Number) as Map)
        .sort((a, b) => a[1] - b[1]);

    mapss.push(map);
}

function walkMapss(initial: number, range: number) {
    let currents: [number, number][] = [[initial, range]];

    for (const maps of mapss) {
        const nexts: [number, number][] = [];

        for (let current of currents) {
            let exhausted = false;

            for (const [to, from, range] of maps) {
                const [currentInitial, currentRange] = current;

                if (from + range <= currentInitial) {
                    continue;
                }

                if (from <= currentInitial) {
                    if (from + range >= currentInitial + currentRange) {
                        nexts.push([currentInitial + to - from, currentRange]);
                        exhausted = true;
                        break;
                    }
                    else {
                        nexts.push([currentInitial + to - from, from + range - currentInitial]);
                        current = [from + range, currentRange - (from + range - currentInitial)];
                        continue;
                    }
                }

                if (from < currentInitial + currentRange) {
                    nexts.push([currentInitial, from - currentInitial]);
                    
                    if (from + range >= currentInitial + currentRange) {
                        nexts.push([to, currentRange - (from - currentInitial)]);
                        exhausted = true;
                        break;
                    }
                    else {
                        nexts.push([to, range]);
                        current = [from + range, currentRange - (from - currentInitial) - range];
                        continue;
                    }
                }

                break;
            }

            if (!exhausted) {
                nexts.push(current);
            }
        }

        currents = nexts;
    }
    
    return currents;
}

let lowest = Number.MAX_SAFE_INTEGER;

const [, ...seeds] = seedLine.split(" ").map(Number);

for (let i = 0; i < seeds.length; i += 2) {
    const [initial, range] = seeds.slice(i, i + 2);
    const results = walkMapss(initial, range);
    
    for (const result of results) {
        const [currentInitial] = result;
        if (currentInitial < lowest) {
            lowest = currentInitial;
        }
    }
}

const end = performance.now();

console.log("answer:", lowest);
console.log("time:", end - start, "ms");
