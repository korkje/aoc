import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

function hash(input: string) {
    let current = 0;

    for (let i = 0; i < input.length; i++) {
        current += input.charCodeAt(i);
        current *= 17;
        current %= 256;
    }

    return current;
}

const boxes = new Array<[string, number][]>(256);

for (let i = 0; i < boxes.length; ++i) {
    boxes[i] = [];
}

for (const step of file.split(",")) {
    const [, lens, instruction] = step.match(/(\w+)(\=\d+|\-)/)!;
    const box = boxes[hash(lens)];

    if (instruction === "-") {
        const i = box.findIndex(([l]) => l === lens);

        if (i !== -1) {
            box.splice(i, 1);
        }
    }
    else {
        const focalLength = parseInt(instruction.slice(1), 10);
        const i = box.findIndex(([l]) => l === lens);

        if (i === -1) {
            box.push([lens, focalLength]);
        }
        else {
            box[i][1] = focalLength;
        }
    }
}

let total = 0;

for (let i = 0; i < boxes.length; ++i) {
    for (let j = 0; j < boxes[i].length; ++j) {
        const [, focalLength] = boxes[i][j];
        total += (i + 1) * (j + 1) * focalLength;
    }
}

const end = performance.now();

console.log("answer:", total);
console.log("time:", end - start, "ms");
