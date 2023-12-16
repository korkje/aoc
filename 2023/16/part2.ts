import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();
const lines = file.split("\n");

const width = lines[0].length;
const height = lines.length;

type Point = [x: number, y: number];

function oob(point: Point) {
    const [x, y] = point;

    return x < 0 || y < 0 || x >= width || y >= height;
}

type Player = {
    position: Point;
    direction: "up" | "down" | "left" | "right";
};

function play(starter: Player) {
    const players: Player[] = [starter];

    const visited = new Set<number>();
    const states = new Set<string>();

    while (players.length) {
        for (const player of players) {
            if (oob(player.position)) {
                players.splice(players.indexOf(player), 1);
                continue;
            }

            const [x, y] = player.position;
            const state = `${x},${y}:${player.direction}`;

            if (states.has(state)) {
                players.splice(players.indexOf(player), 1);
                continue;
            }

            states.add(state);
            visited.add(y * width + x);

            const char = lines[y][x];

            switch (player.direction) {
                case "up":
                    switch (char) {
                        case "-":
                            player.position = [x - 1, y];
                            player.direction = "left";
                            players.push({
                                position: [x + 1, y],
                                direction: "right",
                            });
                            break;
                        case "/":
                            player.position = [x + 1, y];
                            player.direction = "right";
                            break;
                        case "\\":
                            player.position = [x - 1, y];
                            player.direction = "left";
                            break;
                        default:
                            player.position = [x, y - 1];
                            break;
                    }
                    break;
                case "down":
                    switch (char) {
                        case "-":
                            player.position = [x - 1, y];
                            player.direction = "left";
                            players.push({
                                position: [x + 1, y],
                                direction: "right",
                            });
                            break;
                        case "/":
                            player.position = [x - 1, y];
                            player.direction = "left";
                            break;
                        case "\\":
                            player.position = [x + 1, y];
                            player.direction = "right";
                            break;
                        default:
                            player.position = [x, y + 1];
                            break;
                    }
                    break;
                case "left":
                    switch (char) {
                        case "|":
                            player.position = [x, y - 1];
                            player.direction = "up";
                            players.push({
                                position: [x, y + 1],
                                direction: "down",
                            });
                            break;
                        case "/":
                            player.position = [x, y + 1];
                            player.direction = "down";
                            break;
                        case "\\":
                            player.position = [x, y - 1];
                            player.direction = "up";
                            break;
                        default:
                            player.position = [x - 1, y];
                            break;
                    }
                    break;
                case "right":
                    switch (char) {
                        case "|":
                            player.position = [x, y - 1];
                            player.direction = "up";
                            players.push({
                                position: [x, y + 1],
                                direction: "down",
                            });
                            break;
                        case "/":
                            player.position = [x, y - 1];
                            player.direction = "up";
                            break;
                        case "\\":
                            player.position = [x, y + 1];
                            player.direction = "down";
                            break;
                        default:
                            player.position = [x + 1, y];
                            break;
                    }
                    break;
            }
        }
    }

    return visited.size;
}

let max = 0;

for (let x = 0; x < width; ++x) {
    const down = play({
        position: [x, 0],
        direction: "down",
    });

    const up = play({
        position: [x, height - 1],
        direction: "up",
    });

    max = Math.max(max, down, up);
}

for (let y = 0; y < height; ++y) {
    const left = play({
        position: [0, y],
        direction: "right",
    });

    const right = play({
        position: [width - 1, y],
        direction: "left",
    });

    max = Math.max(max, left, right);
}

const end = performance.now();

console.log("answer:", max);
console.log("time:", end - start, "ms");
