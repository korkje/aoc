import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

let [A, B, C, ...program] = file.match(/\d+/g)!.map(Number);
let ip = 0;
let changed = false;
const out: number[] = [];

const operand = (n: number) => n < 4 ? n : [A, B, C][n - 4];

type Instruction = (operand: number) => void;

const instructions: Record<number, Instruction> = {
    0: co => A = A >> operand(co),
    1: lo => B = B ^ lo,
    2: co => B = operand(co) % 8,
    3: lo => [ip, changed] = A === 0 ? [ip, false] : [lo, true],
    4: _o => B = B ^ C,
    5: co => out.push(operand(co) % 8),
    6: co => B = A >> operand(co),
    7: co => C = A >> operand(co),
};

while (ip < program.length - 1) {
    const [i, o] = program.slice(ip, ip + 2);
    instructions[i](o);

    if (changed) {
        changed = false;
        continue;
    }

    ip += 2;
}

const end = performance.now();
console.log("answer:", out.join());
console.log("time:", end - start, "ms");
