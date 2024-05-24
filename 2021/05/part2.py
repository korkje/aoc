from itertools import zip_longest

def parse_coord(coord_str):
    x, y = map(int, coord_str.split(','))
    return x, y

def _range(a, b):
    if a < b:
        return list(range(a, b + 1))
    else:
        return list(range(a, b - 1, -1))

coords = set()
overlaps = set()

for line_str in open(0).readlines():
    (x1, y1), (x2, y2) = map(parse_coord, line_str.split(' -> '))
    for x, y in zip_longest(_range(x1, x2), _range(y1, y2)):
        if x is None:
            x = x2
        if y is None:
            y = y2

        if (x, y) in coords:
            overlaps.add((x, y))
        else:
            coords.add((x, y))

print(len(overlaps))
