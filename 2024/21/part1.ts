import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const coords = (lines: string[]) => {
    const dict: Record<string, number[]> = {};
    for (const [y, line] of lines.entries()) {
        for (const [x, char] of Array.from(line).entries()) {
            dict[char] = [x, y];
        }
    }
    return dict;
};

const numeric = coords([
    "789",
    "456",
    "123",
    " 0A",
]);

const directional = coords([
    " ^A",
    "<v>",
]);

const lr = "< >";
const ud = "^ v";

type Keypad = ReturnType<typeof coords>;

const paths_ab = (keypad: Keypad, a: string, b: string) => {
    const [ax, ay] = keypad[a];
    const [bx, by] = keypad[b];

    const dx = bx - ax;
    const dy = by - ay;

    const _lr = Array(Math.abs(dx)).fill(lr[Math.sign(dx) + 1]).join("");
    const _ud = Array(Math.abs(dy)).fill(ud[Math.sign(dy) + 1]).join("");

    const lrud = _lr + _ud + "A";
    const udlr = _ud + _lr + "A";

    const gapY = keypad === numeric ? 3 : 0;

    if (ax === 0 && by === gapY) {
        return [lrud];
    }

    if (bx === 0 && ay == gapY) {
        return [udlr];
    }

    return [lrud, udlr];
};

const cost = (keypad: Keypad, keys: string, n: number) => {
    if (n === 0) {
        return keys.length;
    }

    let sum = 0;

    for (let i = 0; i < keys.length; ++i) {
        const a = keys[i - 1] ?? "A";
        const b = keys[i]!;

        let min: number = Infinity;

        for (const path of paths_ab(keypad, a, b)) {
            min = Math.min(min, cost(directional, path, n - 1));
        }

        sum += min;
    }

    return sum;
};

let answer = 0;

for (const code of file.split("\n")) {
    answer += cost(numeric, code, 2 + 1) * Number(code.slice(0, -1));
}

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
