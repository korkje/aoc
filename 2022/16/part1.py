import re

expr = re.compile(r'Valve (\w+) has flow rate\=(\d+)\; tunnel(?:s?) lead(?:s?) to valve(?:s?) (.+)$')

def parse(line):
    source, flow, tunnels = expr.match(line).groups()
    return source, int(flow), tunnels.split(', ')

valves = {source: (flow, set(tunnels)) for source, flow, tunnels in map(parse, open(0))}
active = [source for source, (flow, _) in valves.items() if flow > 0]

move_minutes = 1
open_minutes = 1

def distance(source, target):
    queue = [(source, 0)]
    visited = set()

    while queue:
        valve, d = queue.pop(0)
        if valve == target:
            return d + open_minutes
        if valve in visited:
            continue
        visited.add(valve)
        for neighbor in valves[valve][1]:
            queue.append((neighbor, d + move_minutes))

distances = {source: {target: distance(source, target) for target in active} for source in ['AA'] + active}
indices = {valve: i for i, valve in enumerate(active)}

total_minutes = 30
cache = {}

def pressure(source, remaining, mask = 0):
    key = (remaining, source, mask)
    if key in cache:
        return cache[key]

    max_pressure = 0
    for target in active:
        bit = 1 << indices[target]
        if mask & bit:
            continue

        time = distances[source][target]
        if time < remaining:
            flow, _ = valves[target]
            added_pressure = flow * (remaining - time)
            max_pressure = max(
                max_pressure,
                added_pressure + pressure(target, remaining - time, mask | bit)
            )

    cache[key] = max_pressure
    return max_pressure

print(pressure('AA', total_minutes))
