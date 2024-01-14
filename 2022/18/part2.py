from functools import partial

def parse(line):
    return tuple(map(int, line.split(',')))

def merge(xyz, offset):
    return tuple(map(sum, zip(xyz, offset)))

def candidates(xyz):
    return set(map(partial(merge, xyz), offsets))

def oob(xyz):
    x, y, z = xyz
    return not (
        min_x - 1 <= x <= max_x + 1 and
        min_y - 1 <= y <= max_y + 1 and
        min_z - 1 <= z <= max_z + 1
    )

def surface(cube):
    return len(candidates(cube) & air)

offsets = [
    (1, 0, 0), (-1, 0, 0),
    (0, 1, 0), (0, -1, 0),
    (0, 0, 1), (0, 0, -1),
]

cubes = set(map(parse, open(0).read().split()))

min_x = min_y = min_z = float('inf')
max_x = max_y = max_z = float('-inf')

for x, y, z in cubes:
    min_x = min(min_x, x)
    min_y = min(min_y, y)
    min_z = min(min_z, z)
    max_x = max(max_x, x)
    max_y = max(max_y, y)
    max_z = max(max_z, z)

air = set()
seen = set()
queue = [(min_x, min_y, min_z)]

for xyz in queue:
    for adjacent in candidates(xyz) - seen:
        if oob(adjacent):
            continue
        elif adjacent in cubes:
            air.add(xyz)
        else:
            queue.append(adjacent)
            seen.add(adjacent)

print(sum(map(surface, cubes)))
