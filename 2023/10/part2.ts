import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const height = lines.length;
const width = lines[0].length;

type Point = [x: number, y: number];

const conn = {
    top: ["S", "|", "7", "F"],
    right: ["S", "-", "J", "7"],
    bottom: ["S", "|", "L", "J"],
    left: ["S", "-", "L", "F"],
};

const inBounds = ([x, y]: Point) => x >= 0 && x < width && y >= 0 && y < height;

const adjacent = ([x, y]: Point) => {
    const candidates: Point[] = [
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
    ];

    return candidates.filter(inBounds);
};

const findFirst = (start: Point) => adjacent(start).filter(([x, y]) => (
    (y < start[1] && conn.top.includes(lines[y][x])) ||
    (x > start[0] && conn.right.includes(lines[y][x])) ||
    (y > start[1] && conn.bottom.includes(lines[y][x])) ||
    (x < start[0] && conn.left.includes(lines[y][x]))
))[0];

const findNext = (current: Point, previous: Point) => {
    const charC = lines[current[1]][current[0]];

    const candidates = adjacent(current).filter(([x, y]) => {
        const charN = lines[y][x];

        if (y < current[1]) {
            return conn.bottom.includes(charC) && conn.top.includes(charN);
        }
        else if (x > current[0]) {
            return conn.left.includes(charC) && conn.right.includes(charN);
        }
        else if (y > current[1]) {
            return conn.top.includes(charC) && conn.bottom.includes(charN);
        }
        else if (x < current[0]) {
            return conn.right.includes(charC) && conn.left.includes(charN);
        }
    });

    return candidates.filter(([x, y]) => !(x === previous[0] && y === previous[1]))[0];
}

const isStart = ([x, y]: Point) => lines[y][x] === "S";

const loop: Point[] = [];

outer:
for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if (lines[y][x] === "S") {
            loop.push([x, y]);
            loop.push(findFirst([x, y]));
            break outer;
        }
    }
}

for (let i = 1; !isStart(loop[i]); ++i) {
    loop.push(findNext(loop[i], loop[i - 1]));
}

const loopSet = new Set(loop.map(([x, y]) => `${x},${y}`));

let inside = 0;
for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if (loopSet.has(`${x},${y}`)) {
            continue;
        }

        let hits = 0;
        for (let x2 = x + 1; x2 < width; ++x2) {
            if (loopSet.has(`${x2},${y}`)) {
                const x2c = lines[y][x2];
                
                if (x2c === "|") {
                    ++hits;
                    continue;
                }

                for (let x3 = x2 + 1; x3 < width; ++x3) {
                    const x3c = lines[y][x3];
                    if (!loopSet.has(`${x3},${y}`)) {
                        break;
                    }

                    if (x2c === "F" && x3c === "J") {
                        ++hits;
                        break;
                    }
                    else if (x2c === "F" && x3c === "7") {
                        break;
                    }
                    else if (x2c === "L" && x3c === "7") {
                        ++hits;
                        break;
                    }
                    else if (x2c === "L" && x3c === "J") {
                        break;
                    }
                }
            }
        }

        if (hits % 2 === 1) {
            ++inside;
        }
    }
}

const end = performance.now();

console.log("answer:", inside);
console.log("time:", end - start, "ms");
