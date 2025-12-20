import read from "jsr:@korkje/read@0.1.2";

const file = await read();
const start = performance.now();

const computers = new Map<string, string[]>();

for (const line of file.split("\n")) {
    const [a, b] = line.split("-");
    computers.set(a, (computers.get(a) ?? []).concat([b]));
    computers.set(b, (computers.get(b) ?? []).concat([a]));
};

const networks = new Set<string>();

const search = (a: string, required: string[]) => {
    const key = required.sort().join();
    if (networks.has(key)) {
        return;
    }
    networks.add(key);

    for (const b of computers.get(a)!) {
        if (required.includes(b)) {
            continue;
        }

        if (!required.every(r => computers.get(r)!.includes(b))) {
            continue;
        }

        search(b, required.concat([b]));
    }
};

for (const k of computers.keys()) {
    search(k, [k]);
}

let answer = "";

for (const n of networks) {
    if (n.length >= answer.length) {
        answer = n;
    }
}

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
