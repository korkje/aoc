import read from "jsr:@korkje/read@0.1.2";
import M from "jsr:@korkje/memz@0.2.1";

const file = await read();
const start = performance.now();

const [top, bottom] = file.split("\n\n");
const patterns = new Set(top.split(", "));
const designs = bottom.split("\n");

const possible = M((design: string) => {
    if (patterns.has(design)) {
        return true;
    }

    for (let i = 1; i < design.length; ++i) {
        const part = design.slice(0, i);
        if (patterns.has(part)) {
            if (possible(design.slice(i))) {
                return true;
            }
        }
    }

    return false;
});

const answer = designs.filter(possible).length;

const end = performance.now();
console.log("answer:", answer);
console.log("time:", end - start, "ms");
