import read from "https://deno.land/x/read@v0.1.1/mod.ts";

const file = await read();
const start = performance.now();

const components = new Map<string, Set<string>>();

function init(key: string) {
    if (!components.has(key)) {
        components.set(key, new Set());
    }

    return components.get(key)!;
}

for (const line of file.split("\n")) {
    const [mainStr, ...restStrs] = line.split(/\:? /);

    const main = init(mainStr);

    for (const restStr of restStrs) {
        const rest = init(restStr);

        main.add(restStr);
        rest.add(mainStr);
    }
}

const traffic = new Map<string, number>();

for (const [key, values] of components) {
    for (const value of values) {
        traffic.set([key, value].sort().join(":"), 0);
    }
}

function bfs(start: string, end: string): string[] {
    const queue = [start];
    const visited = new Set<string>();
    const path = new Map<string, string>();

    while (queue.length > 0) {
        const current = queue.shift()!;

        if (current === end) {
            const result = [current];

            while (path.has(result[0])) {
                result.unshift(path.get(result[0])!);
            }

            return result;
        }

        if (visited.has(current)) {
            continue;
        }

        visited.add(current);

        for (const neighbor of components.get(current)!) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                path.set(neighbor, current);
            }
        }
    }

    return [];
}

const nodes = [...components.keys()];

for (let i = 0; i < 1000; ++i) {
    const n1 = nodes[Math.floor(Math.random() * nodes.length)];
    const n2 = nodes[Math.floor(Math.random() * nodes.length)];

    const path = bfs(n1, n2);

    for (let i = 0; i < path.length - 1; ++i) {
        const key = [path[i], path[i + 1]].sort().join(":");
        traffic.set(key, traffic.get(key)! + 1);
    }
}

const sorted = [...traffic.entries()].sort((a, b) => b[1] - a[1]);
const top3 = sorted.slice(0, 3).map(([key]) => key);

for (const edge of top3) {
    const [n1, n2] = edge.split(":");

    components.get(n1)!.delete(n2);
    components.get(n2)!.delete(n1);
}

function size(start: string): number {
    const visited = new Set<string>();

    function dfs(current: string): number {
        if (visited.has(current)) {
            return 0;
        }

        visited.add(current);

        let result = 1;

        for (const neighbor of components.get(current)!) {
            result += dfs(neighbor);
        }

        return result;
    }

    return dfs(start);
}

const [l, r] = top3[0].split(":");

const answer = size(l) * size(r);
const end = performance.now();

console.log("answer:", answer);
console.log("time:", end - start, "ms");
