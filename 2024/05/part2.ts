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

const isInvalid = (pages: string[]): number => {
    for (let i = pages.length - 1; i >= 1; i--) {
        const page = pages[i];
        const rest = new Set(pages.slice(0, i));

        if (orderings.has(page)) {
            if (orderings.get(page)!.intersection(rest).size) {
                return i;
            }
        }
    }

    return 0;
};

const invalid = instructions
    .split("\n")
    .map(instruction => instruction.split(","))
    .filter(isInvalid);

for (const pages of invalid) {
    let i: number;
    // deno-lint-ignore no-cond-assign
    while (i = isInvalid(pages)) {
        const page = pages[i];
        const rest = new Set(pages.slice(0, i));

        const intersection = orderings.get(page)!.intersection(rest);
        const first = Array.from(intersection).map(value => pages.indexOf(value))[0];

        pages.splice(first, 0, pages.splice(i, 1)[0]);
    }
}

const answer = invalid
    .map(pages => +pages[Math.floor(pages.length / 2)])
    .reduce((a, b) => a + b, 0);

const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
