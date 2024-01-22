from itertools import product, cycle, islice

elves = set()
for y, line in enumerate(open(0)):
    for x, char in enumerate(line):
        if char == '#':
            elves.add((x, y))

adjacents = set(product([-1, 0, 1], repeat=2)) - {(0, 0)}

dir_str = {
    (0, -1): 'N',
    (0, 1): 'S',
    (-1, 0): 'W',
    (1, 0): 'E',
}

directions = {
    (0, -1): [(-1, -1), (0, -1), (1, -1)],
    (0, 1): [(1, 1), (0, 1), (-1, 1)],
    (-1, 0): [(-1, 1), (-1, 0), (-1, -1)],
    (1, 0): [(1, -1), (1, 0), (1, 1)],
}

check_cycle = cycle(directions.keys())

def merge(a, b):
    return tuple(map(sum, zip(a, b)))

for i in range(10):
    moves = {}
    duplicates = set()
    check = list(islice(check_cycle, 4))

    for elf in elves:
        if not {merge(elf, dxdy) for dxdy in adjacents} & elves:
            continue

        for direction in check:
            nxny = merge(elf, direction)
            if not {merge(elf, dxdy) for dxdy in directions[direction]} & elves:
                if nxny in moves:
                    duplicates.add(nxny)
                else:
                    moves[nxny] = elf
                break

    moves = {k: v for k, v in moves.items() if k not in duplicates}

    for to, elf in moves.items():
        elves.remove(elf)
        elves.add(to)

    next(check_cycle)

minx = maxx = miny = maxy = 0

for x, y in elves:
    minx = min(minx, x)
    maxx = max(maxx, x)
    miny = min(miny, y)
    maxy = max(maxy, y)

print((maxx - minx + 1) * (maxy - miny + 1) - len(elves))
