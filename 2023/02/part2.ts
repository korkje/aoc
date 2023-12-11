import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const powers: number[] = [];

for (const line of file.split("\n")) {
    const parts = line.split(":");

    const map: Record<string, number[]> = {
        "red": [],
        "green": [],
        "blue": [],
    };
    
    for (const pick of parts[1].split(";")) {
        for (const colorStr of pick.split(",")) {
            const [amountStr, color] = colorStr.trim().split(" ");
            map[color].push(parseInt(amountStr));
        }
    }

    const red = Math.max(...map["red"]);
    const green = Math.max(...map["green"]);
    const blue = Math.max(...map["blue"]);

    powers.push(red * green * blue);
}

const sum = powers.reduce((a, b) => a + b, 0);
const end = performance.now();

console.log("answer:", sum);
console.log("time:", end - start, "ms");