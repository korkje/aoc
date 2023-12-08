const file = await Deno.readTextFile("input.txt");
const start = performance.now();

const [header, body] = file.split("\n\n");

const nodes = new Map<string, { left: string, right: string }>();

for (const line of body.split("\n")) {
    const [name, lr] = line.split(" = ");
    const [left, right] = lr.match(/\w+/g)!;

    nodes.set(name, { left, right });
}

let current = "AAA";
const directions = header.split("").map((d) => d === "L" ? "left" : "right");

let steps = 0;
while (current !== "ZZZ") {
    current = nodes.get(current)![directions[steps++ % directions.length]];
}

const end = performance.now();

console.log("answer:", steps);
console.log("time:", end - start, "ms");
