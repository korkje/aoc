from collections import deque
from itertools import starmap

def parse(line):
    lights, *schemas, _ = line.split()
    lights = tuple(map(lambda x: x == "#", lights[1:-1]))
    schemas = [set(map(int, s[1:-1].split(","))) for s in schemas]
    return (lights, schemas)

def solve(target, schemas):
    state = (False,) * len(target)
    queue = deque([(state, 0)])
    seen = {state}

    while queue:
        state, n = queue.popleft()

        for schema in schemas:
            new_state = tuple(x ^ (i in schema) for i, x in enumerate(state))

            if new_state == target:
                return n + 1

            if new_state not in seen:
                seen.add(new_state)
                queue.append((new_state, n + 1))

print(sum(starmap(solve, map(parse, open(0)))))
