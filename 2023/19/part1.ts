import read from "https://deno.land/x/read@v0.1.1/mod.ts";
import adt, { match, Variants } from "npm:@korkje/adt";

const file = await read();
const start = performance.now();

const stats = "xmas";

const condition = adt({
    lt: (stat: number, target: number) => [stat, target],
    gt: (stat: number, target: number) => [stat, target],
    none: null,
});

function createCondition(conditionStr: string | undefined) {
    if (!conditionStr) {
        return condition.none;
    }

    const [, stat, cmp, target] = conditionStr.match(/(\w)([<>])(\d+)/)!;
    const ltgt = cmp === "<" ? "lt" : "gt";

    return condition[ltgt](stats.indexOf(stat), Number(target));
}

const action = adt({
    accept: null,
    reject: null,
    send: (workflow: string) => workflow,
});

function createAction(actionStr: string) {
    if (actionStr === "A") {
        return action.accept;
    }

    if (actionStr === "R") {
        return action.reject;
    }

    return action.send(actionStr);
}

type Rule = [Variants<typeof condition>, Variants<typeof action>];
const workflows = new Map<string, Rule[]>();

const [workflowsStr, partsStr] = file.split("\n\n");

for (const workflowStr of workflowsStr.split("\n")) {
    const [, name, rulesStr] = workflowStr.match(/(\w+)\{(.+)\}/)!;

    workflows.set(name, rulesStr.split(",").map(rule => {
        const [, conditionStr, actionStr] = rule.match(/(\w[<>]\d+\:)?(\w+)/)!;
        return [createCondition(conditionStr), createAction(actionStr)] as Rule;
    }));
}

let score = 0;

for (const part of partsStr.split("\n")) {
    const [...values] = part.match(/\d+/g)!;
    const stats = values.map(Number);

    let current: string | undefined = "in";

    while (current) {
        for (const [condition, action] of workflows.get(current)!) {
            const pass = match(condition, {
                gt: ([stat, target]) => stats[stat] > target,
                lt: ([stat, target]) => stats[stat] < target,
                none: () => true,
            });

            if (pass) {
                current = match(action, {
                    accept: () => {
                        score += stats.reduce((a, b) => a + b);
                        return undefined;
                    },
                    reject: () => undefined,
                    send: workflow => workflow,
                });

                break;
            }
        }
    }
}

const end = performance.now();

console.log("answer:", score);
console.log("time:", end - start, "ms");
