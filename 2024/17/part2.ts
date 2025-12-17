import read from "jsr:@korkje/read@0.1.2";
import range from "jsr:@korkje/range@0.2.2";

const file = await read();
const start = performance.now();

const program = file.match(/\d+/g)!.slice(3).map(BigInt);

const solve = (target: bigint[], ans: bigint): void | bigint => {
    if (target.length === 0) {
        return ans;
    }

    for (const t of range(8)) {
        let [A, B, C] = [ans << 3n | BigInt(t), 0n, 0n];
        let out: bigint | undefined;

        const operand = (n: bigint) => n < 4n ? n : [A, B, C][Number(n - 4n)];

        const instructions: Record<number, (o: bigint) => void> = {
            0: co => A = A >> operand(co),
            1: lo => B = B ^ lo,
            2: co => B = operand(co) % 8n,
            3: _o => { throw new Error("Unexpected 'jnz'") },
            4: _o => B = B ^ C,
            5: co => out = operand(co) % 8n,
            6: co => B = A >> operand(co),
            7: co => C = A >> operand(co),
        };

        for (const ip of range(0, program.length - 4, 2)) {
            const [i, o] = program.slice(ip, ip + 2);
            instructions[Number(i)]?.(o);
        }

        if (out === target.at(-1)) {
            const next = solve(target.slice(0, -1), A);
            if (next !== undefined) {
                return next;
            }
        }
    }
};

const A = solve(program, 0n);

const end = performance.now();
console.log("answer:", Number(A));
console.log("time:", end - start, "ms");
