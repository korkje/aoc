import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

let vertical = 0;
let horizontal = 0;

const maps = file.split("\n\n").map(raw => raw.split("\n"));

for (const map of maps) {
    const [width, height] = [map[0].length, map.length];

    loop_h:
    for (let x = 1; x < width; ++x) {
        let smudge = false;
        for (let y = 0; y < height; ++y) {
            for (let x2 = 0; x2 < Math.min(x, width - x); ++x2) {
                const [left, right] = [x - (x2 + 1), x + x2];
                if (map[y][left] !== map[y][right]) {
                    if (smudge) {
                        continue loop_h;
                    }
                    smudge = true;
                }
            }
        }
        if (smudge) {
            horizontal += x;
        }
    }

    loop_v:
    for (let y = 1; y < height; ++y) {
        let smudge = false;
        for (let x = 0; x < width; ++x) {
            for (let y2 = 0; y2 < Math.min(y, height - y); ++y2) {
                const [top, bottom] = [y - (y2 + 1), y + y2];
                if (map[top][x] !== map[bottom][x]) {
                    if (smudge) {
                        continue loop_v;
                    }
                    smudge = true;
                }
            }
        }
        if (smudge) {
            vertical += y;
        }
    }
}

const answer = horizontal + 100 * vertical;
const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
