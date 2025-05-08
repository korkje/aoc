import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const lines = file.split("\n");
const width = lines[0].length;
const height = lines.length;

const inBounds = (x: number, y: number) =>
    x >= 0 && x < width && y >= 0 && y < height;

const dxdy = [[0, -1], [0, 1], [-1, 0], [1, 0]];
const visited = new Set<string>();

const cost = (x: number, y: number) => {
    const char = lines[y][x];
    const region = new Set<string>();
    const perimeter = new Set<string>();
    const queue = [[x, y]];

    while (queue.length) {
        const [x, y] = queue.pop()!;
        const key = `${x},${y}`;

        region.add(key);
        visited.add(key);

        for (const [dx, dy] of dxdy) {
            const nx = x + dx;
            const ny = y + dy;
            const nkey = `${nx},${ny}`;
            const ndkey = `${nkey},${dx},${dy}`;

            if (!inBounds(nx, ny)) {
                perimeter.add(ndkey);
                continue;
            }

            if (lines[ny][nx] !== char) {
                perimeter.add(ndkey);
            }
            else if (!region.has(nkey)) {
                queue.push([nx, ny]);
            }
        }
    }

    return region.size * perimeter.size;
};

let total = 0;

for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if (!visited.has(`${x},${y}`)) {
            total += cost(x, y);
        }
    }
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
