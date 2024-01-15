from cachetools import cached
from math import ceil
from operator import mul
import re

numbers = re.compile(r'\d+')

def parse(line):
    values = map(int, numbers.findall(line))
    return (next(values), [
        [(0, next(values))],
        [(0, next(values))],
        [(0, next(values)), (1, next(values))],
        [(0, next(values)), (2, next(values))],
    ])

blueprints = map(parse, open(0))

def state(*args):
    id, _ = args[0]
    robots, inventory, time = args[2:]
    return (id, robots, inventory, time)

@cached(cache={}, key=state)
def solve(
    blueprint,
    max_costs,
    robots = (1, 0, 0, 0),
    inventory = (0, 0, 0, 0),
    time = 24,
):
    max_geodes = inventory[-1] + robots[-1] * time
    if time == 0:
        return max_geodes

    _, recipes = blueprint
    for i, recipe in enumerate(recipes):
        if i < 3 and robots[i] >= max_costs[i]:
            continue

        delay = 0
        for kind, cost in recipe:
            if robots[kind] == 0:
                break
            delay = max(delay, ceil((cost - inventory[kind]) / robots[kind]))
        else:
            remaining = time - delay - 1
            if remaining <= 0:
                continue
            new_inventory = [x + y * (delay + 1) for x, y in zip(inventory, robots)]
            for kind, cost in recipe:
                new_inventory[kind] -= cost
            for j in range(3):
                new_inventory[j] = min(new_inventory[j], max_costs[j] * remaining)
            max_geodes = max(max_geodes, solve(
                blueprint,
                max_costs,
                robots[:i] + (robots[i] + 1,) + robots[i + 1:],
                tuple(new_inventory),
                remaining,
            ))

    return max_geodes

def max_costs(recipes):
    result = [0] * 3
    for recipe in recipes:
        for kind, cost in recipe:
            result[kind] = max(result[kind], cost)
    return result

scores = []
for id, recipes in blueprints:
    score = solve(
        (id, recipes),
        max_costs(recipes),
        (1, 0, 0, 0),
        (0, 0, 0, 0),
        24,
    )
    scores.append((score, id))

print(sum(map(mul, *zip(*scores))))
