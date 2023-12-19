import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const stats = "xmas";

type Rule = [number, string, number, string];
const workflows = new Map<string, [Rule[], string]>();

const [workflowStrs] = file.split("\n\n");

for (const workflowStr of workflowStrs.split("\n")) {
    const [, name, rulesStr] = workflowStr.match(/(\w+)\{(.+)\}/)!;

    const ruleStrs = rulesStr.split(",");
    const fallback = ruleStrs.pop()!;

    const rules = ruleStrs.map(ruleStr => {
        const [, stat, cmp, target, destination] = ruleStr.match(/(\w)([<>])(\d+)\:(\w+)/)!;
        return [stats.indexOf(stat), cmp, Number(target), destination] as Rule;
    });

    workflows.set(name, [rules, fallback]);
}

const copyRanges = (ranges: number[][]) => ranges.map(([start, stop]) => [start, stop]);

function count(ranges: number[][], workflow: string) {
    if (workflow === "R") {
        return 0;
    }

    if (workflow === "A") {
        return ranges.reduce((product, [start, stop]) => product * (stop - start + 1), 1);
    }

    let empty = false;
    let total = 0;

    const [rules, fallback] = workflows.get(workflow)!;

    for (const [stat, cmp, target, destination] of rules) {
        const [start, stop] = ranges[stat];

        const [r0, r1] = cmp === "<"
            ? [[start, target - 1], [target, stop]]
            : [[target + 1, stop], [start, target]];

        if (r0[0] <= r0[1]) {
            const copy = copyRanges(ranges);
            copy[stat] = r0;
            total += count(copy, destination);
        }

        if (r1[0] <= r1[1]) {
            ranges = copyRanges(ranges);
            ranges[stat] = r1;
        }
        else {
            empty = true;
            break;
        }
    }

    if (!empty) {
        total += count(ranges, fallback);
    }

    return total;
}

const score = count(Array(4).fill([1, 4000]), "in");
const end = performance.now();

console.log("answer:", score);
console.log("time:", end - start, "ms");
