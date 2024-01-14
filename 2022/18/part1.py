from functools import partial

def parse(line):
    return tuple(map(int, line.split(',')))

def merge(cube, offset):
    return tuple(map(sum, zip(cube, offset)))

def candidates(cube):
    return set(map(partial(merge, cube), offsets))

def surface(cube):
    return len(candidates(cube) - cubes)

offsets = [
    (1, 0, 0), (-1, 0, 0),
    (0, 1, 0), (0, -1, 0),
    (0, 0, 1), (0, 0, -1),
]

cubes = set(map(parse, open(0).read().split()))
print(sum(map(surface, cubes)))
