const file = await Deno.readTextFile("input.txt");
const start = performance.now();

const [header, body] = file.split("\n\n");

const currents: string[] = [];
const nodes = new Map<string, { left: string, right: string }>();

for (const line of body.split("\n")) {
    const [name, lr] = line.split(" = ");
    const [left, right] = lr.match(/\w+/g)!;

    if (name.endsWith("A")) {
        currents.push(name);
    }
    nodes.set(name, { left, right });
}

const directions = header.split("").map((d) => d === "L" ? "left" : "right");

const results: number[] = [];
for (let current of currents) {
    let steps = 0;
    while (!current.endsWith("Z")) {
        current = nodes.get(current)![directions[steps++ % directions.length]];
    }

    results.push(steps);
}

const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
const lcm = (a: number, b: number): number => a * b / gcd(a, b);

const result = results.reduce(lcm);
const end = performance.now();

console.log("answer:", result);
console.log("time:", end - start, "ms");
