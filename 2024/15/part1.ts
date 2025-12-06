import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const [top, bottom] = file.split("\n\n");
const grid = top.split("\n");
const dirs: Record<string, number[]> = { "^": [0, -1], ">": [1, 0], "v": [0, 1], "<": [-1, 0] };
const moves = bottom.replaceAll("\n", "").split("").map(_ => dirs[_]);

let player = [-1, -1];
const boxes: Set<`${number},${number}`> = new Set();

for (const [y, row] of grid.entries()) {
    for (const [x, cell] of row.split("").entries()) {
        switch (cell) {
            case "O":
                boxes.add(`${x},${y}`);
                break;
            case "@":
                player = [x, y];
                break;
        }
    }
}

const add = (a: number[], b: number[]) => [a[0] + b[0], a[1] + b[1]];

for (const move of moves) {
    let [nx, ny] = add(player, move);

    if (grid[ny][nx] === "#") {
        continue;
    }

    while (boxes.has(`${nx},${ny}`)) {
        [nx, ny] = add([nx, ny], move);
    }

    if (grid[ny][nx] === "#") {
        continue;
    }

    player = add(player, move);
    const [x, y] = player;

    if (boxes.delete(`${x},${y}`)) {
        boxes.add(`${nx},${ny}`);
    }
}

let sum = 0;
for (const box of boxes) {
    const [x, y] = box.split(",").map(Number);
    sum += 100 * y + x;
}

const end = performance.now();
console.log("answer:", sum);
console.log("time:", end - start, "ms");
