import read from "jsr:@korkje/read";

const file = await read();
const start = performance.now();

const [rules, instructions] = file.split("\n\n");

const orderings = new Map<string, Set<string>>();

for (const rule of rules.split("\n")) {
    const [key, value] = rule.split("|");

    if (!orderings.has(key)) {
        orderings.set(key, new Set());
    }

    orderings.get(key)!.add(value);
}

const valid: string[][] = [];

outer:
for (const instruction of instructions.split("\n")) {
    const pages = instruction.split(",");

    for (let i = pages.length - 1; i >= 1; i--) {
        const page = pages[i];
        const rest = new Set(pages.slice(0, i));

        if (orderings.has(page)) {
            if (orderings.get(page)!.intersection(rest).size) {
                continue outer;
            }
        }
    }

    valid.push(pages);
}

const answer = valid
    .map(pages => +pages[Math.floor(pages.length / 2)])
    .reduce((a, b) => a + b, 0);

const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
