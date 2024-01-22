from functools import partial
from math import lcm

lines = [line[1:-1] for line in open(0).read().splitlines()[1:-1]]
width, height = len(lines[0]), len(lines)
blizzards = [set() for _ in range(4)]

for y, line in enumerate(lines):
    for x, char in enumerate(line):
        if (i := "<>^v".find(char)) != -1:
            blizzards[i].add((x, y))

def merge(a, b):
    return tuple(map(sum, zip(a, b)))

dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
dxdy = dirs + [(0, 0)]
queue = [(0, (0, -1))]
seen = set()
end = (width - 1, height)
mod = lcm(width, height)

while queue:
    time, pos = queue.pop(0)
    time += 1

    for npos in map(partial(merge, pos), dxdy):
        if npos == end:
            print(time)
            exit()

        nx, ny = npos
        if not (0 <= nx < width and 0 <= ny < height) and not npos == (0, -1):
            continue

        for i, (dx, dy) in enumerate(dirs):
            if ((nx - dx * time) % width, (ny - dy * time) % height) in blizzards[i]:
                break
        else:
            key = (npos, time % mod)

            if key not in seen:
                queue.append((time, npos))
                seen.add(key)

