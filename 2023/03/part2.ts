const file = await Deno.readTextFile("./input.txt");

const start = performance.now();

const numbers: number[] = [];

const reNumber = /\d+/g;
const reStar = /\*/g;

function adjacentNumbers(lines: string[], i: number) {
    const numbers: number[] = [];

    for (const line of lines) {
        let match;
        while ((match = reNumber.exec(line)) !== null) {
            const { index, 0: { length } } = match;

            if (index <= i + 1 && (index + length - 1) >= i - 1) {
                numbers.push(Number(match[0]));
            }
        }
    }

    return numbers;
}

const lines = file.split("\n");

for (let i = 0; i < lines.length; ++i) {
    let match;
    while ((match = reStar.exec(lines[i])) !== null) {
        const { index } = match;

        const linesToCheck: string[] = [];

        if (i > 0) {
            linesToCheck.push(lines[i - 1]);
        }
        linesToCheck.push(lines[i]);
        if (i < lines.length - 1) {
            linesToCheck.push(lines[i + 1]);
        }

        const adjacent = adjacentNumbers(linesToCheck, index);

        if (adjacent.length === 2) {
            numbers.push(adjacent[0] * adjacent[1]);
        }   
    }
}

const sum = numbers.reduce((a, b) => a + b, 0);
const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");