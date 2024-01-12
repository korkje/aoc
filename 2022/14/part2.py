from functools import partial
from operator import add

def parse_line(line):
    return list(map(parse_coordinate, line.split(' -> ')))

def parse_coordinate(coordinate):
    return list(map(int, coordinate.split(',')))

blocked = set()
floor = 0

for coordinates in map(parse_line, open(0).readlines()):
    for ((x1, y1), (x2, y2)) in zip(coordinates, coordinates[1:]):
        x1, x2 = min(x1, x2), max(x1, x2)
        y1, y2 = min(y1, y2), max(y1, y2)
        floor = max(floor, y2 + 2)

        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                blocked.add(x + y * 1j)

change = [1j, 1j - 1, 1j + 1]
pile = 0

while True:
    sand = 500

    while True:
        for next in map(partial(add, sand), change):
            if next not in blocked and next.imag < floor:
                sand = next
                break
        else:
            blocked.add(sand)
            pile += 1
            break

    if 500 in blocked:
        break

print(pile)
