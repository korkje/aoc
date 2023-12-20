import read from "https://deno.land/x/read@v0.1.1/mod.ts";
import FIFO from "https://deno.land/x/fifo@v0.2.2/mod.ts";

const file = await read();
const start = performance.now();

enum Kind {
    FlipFlop,
    Conjunction,
    Broadcast,
};

type Module = {
    kind: Kind.Broadcast;
    destinations: string[];
} | {
    kind: Kind.Conjunction;
    inputs: { [name: string]: 0 | 1 };
    destinations: string[];
} | {
    kind: Kind.FlipFlop;
    destinations: string[];
    state: 0 | 1;
};

const modules: Record<string, Module> = {};

for (const line of file.split("\n")) {
    const [, prefix, name, destinationsStr] = line.match(/(\%|\&)?(\w+) \-\> (.*)/)!;
    const destinations = destinationsStr.split(", ");

    switch (prefix) {
        case undefined:
            modules[name] = { kind: Kind.Broadcast , destinations };
            break;

        case "%":
            modules[name] = { kind: Kind.FlipFlop , destinations, state: 0 };
            break;

        case "&":
            modules[name] = { kind: Kind.Conjunction , destinations, inputs: {} };
            break;
    }
}

for (const key in modules) {
    const module = modules[key];

    const destinations = module.destinations
        .map(destination => modules[destination])
        .filter(destination => destination !== undefined);

    for (const destination of destinations) {
        if (destination.kind === Kind.Conjunction) {
            destination.inputs[key] = 0;
        }
    }
}

const queue = new FIFO<[string, string, 0 | 1]>();

let lows = 0;
let highs = 0;

function send(from: string, to: string, pulse: 0 | 1) {
    if (pulse === 0) {
        ++lows;
    }
    else {
        ++highs;
    }

    queue.push([from, to, pulse]);
}

for (let i = 0; i < 1000; ++i) {
    send("button", "broadcaster", 0);

    while (queue.length) {
        const [from, to, pulse] = queue.shift()!;
        const module = modules[to];

        if (module === undefined) {
            continue;
        }

        switch (module.kind) {
            case Kind.Broadcast: {
                for (const destination of module.destinations) {
                    send(to, destination, pulse);
                }
                break;
            }
            case Kind.Conjunction: {
                module.inputs[from] = pulse;
                const allHigh = Object.values(module.inputs).every(pulse => pulse === 1);

                for (const destination of module.destinations) {
                    send(to, destination, allHigh ? 0 : 1);
                }

                break;
            }
            case Kind.FlipFlop: {
                if (pulse === 0) {
                    module.state = module.state === 0 ? 1 : 0;

                    for (const destination of module.destinations) {
                        send(to, destination, module.state);
                    }
                }
                break;
            }
        }
    }
}

const end = performance.now();

console.log("answer:", highs * lows);
console.log("time:", end - start, "ms");
