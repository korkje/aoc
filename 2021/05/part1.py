def parse_coord(coord_str):
    x, y = map(int, coord_str.split(','))
    return x, y

horizontal = []
vertical = []

for line_str in open(0).readlines():
    (x1, y1), (x2, y2) = map(parse_coord, line_str.split(' -> '))

    if x1 == x2:
        vertical.append((x1, y1, y2))
    elif y1 == y2:
        horizontal.append((y1, x1, x2))

horizontal.sort()
vertical.sort()

intersections = set()

for y, x1, x2 in horizontal:
    x1, x2 = sorted([x1, x2])
    for x, y1, y2 in vertical:
        y1, y2 = sorted([y1, y2])
        if x1 <= x <= x2 and y1 <= y <= y2:
            intersections.add((x, y))

overlaps = set()

for a, b in zip(horizontal, horizontal[1:]):
    if a[0] == b[0]:
        a_min, a_max = sorted([a[1], a[2]])
        b_min, b_max = sorted([b[1], b[2]])
        if a_min <= b_min <= a_max:
            for x in range(b_min, min(a_max, b_max) + 1):
                overlaps.add((x, a[0]))
        elif b_min <= a_min <= b_max:
            for x in range(a_min, min(a_max, b_max) + 1):
                overlaps.add((x, a[0]))

for a, b in zip(vertical, vertical[1:]):
    if a[0] == b[0]:
        a_min, a_max = sorted([a[1], a[2]])
        b_min, b_max = sorted([b[1], b[2]])
        if a_min <= b_min <= a_max:
            for y in range(b_min, min(a_max, b_max) + 1):
                overlaps.add((a[0], y))
        elif b_min <= a_min <= b_max:
            for y in range(a_min, min(a_max, b_max) + 1):
                overlaps.add((a[0], y))

print(len(intersections | overlaps))
