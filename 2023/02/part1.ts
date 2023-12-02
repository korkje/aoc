const file = await Deno.readTextFile("./input.txt");
const start = performance.now();

const possible: Record<string, number> = {
    "red": 12,
    "green": 13,
    "blue": 14,
};

const ids: number[] = [];

outer:
for (const line of file.split("\n")) {
    const parts = line.split(":");
    const id = parts[0].match(/\d+/g)![0];
    
    for (const pick of parts[1].split(";")) {
        for (const colorStr of pick.split(",")) {
            const [amountStr, color] = colorStr.trim().split(" ");

            if (parseInt(amountStr) > possible[color]) {
                continue outer;
            }
        }
    }

    ids.push(parseInt(id));
}

const sum = ids.reduce((a, b) => a + b, 0);
const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");
