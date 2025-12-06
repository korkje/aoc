import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const [top, bottom] = file.split("\n\n");
const grid = top.split("\n").map(row => row
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
);
const dirs: Record<string, number[]> = { "^": [0, -1], ">": [1, 0], "v": [0, 1], "<": [-1, 0] };
const moves = bottom.replaceAll("\n", "").split("").map(_ => dirs[_]);

let player = [-1, -1];
const boxes: Set<`${number},${number}`> = new Set();

for (const [y, row] of grid.entries()) {
    for (const [x, cell] of row.split("").entries()) {
        switch (cell) {
            case "[":
                boxes.add(`${x},${y}`);
                break;
            case "@":
                player = [x, y];
                break;
        }
    }
}

const add = (a: number[], b: number[]) => [a[0] + b[0], a[1] + b[1]];

outer:
for (const move of moves) {
    let [nx, ny] = add(player, move);

    if (grid[ny][nx] === "#") {
        continue;
    }

    const boxesToMove: number[][] = [];

    if (move[1] === 0) {
        if (move[0] === -1) {
            nx -= 1;
        }

        while (boxes.has(`${nx},${ny}`)) {
            boxesToMove.push([nx, ny]);
            const [mx, my] = move;
            [nx, ny] = add([nx, ny], [mx * 2, my]);
        }

        if (move[0] === -1) {
            nx += 1;
        }

        if (grid[ny][nx] === "#") {
            continue;
        }
    }
    else {
        let edges = [[nx, ny]];

        while (true) {
            let found = false;
            const nextEdges: number[][] = []

            for (const [ex, ey] of edges) {
                if (grid[ey][ex] === "#") {
                    continue outer;
                }

                for ([nx, ny] of [[ex, ey], [ex - 1, ey]]) {
                    if (boxes.has(`${nx},${ny}`)) {
                        found = true;
                        boxesToMove.push([nx, ny]);
                        nextEdges.push(add([nx, ny], move), add([nx + 1, ny], move));
                    }
                }
            }

            if (!found) {
                break;
            }

            edges = nextEdges;
        }
    }

    player = add(player, move);

    for (const [x, y] of boxesToMove.toReversed()) {
        boxes.delete(`${x},${y}`);
        [nx, ny] = add([x, y], move);
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
