import re

def parse(line):
    x1, y1, x2, y2 = map(int, re.findall(r'(-?\d+)', line))
    sensor, beacon = (x1, y1), (x2, y2)
    return sensor, manhattan_distance(sensor, beacon)

def manhattan_distance(a, b):
    x1, y1 = a
    x2, y2 = b
    return abs(x1 - x2) + abs(y1 - y2)

def intersection(sensor, reach, line):
    x, y = sensor
    distance = abs(line - y)

    if distance > reach:
        return None

    x1 = x - (reach - distance)
    x2 = x + (reach - distance)
    return x1, x2

min_xy = 0
max_xy = 4_000_000

sensors = list(map(parse, open(0).readlines()))

for y in range(max_xy):
    intersections = []
    for sensor, reach in sensors:
        res = intersection(sensor, reach, y)

        if res is not None:
            x1, x2 = res

            if x2 < min_xy or x1 > max_xy:
                continue

            if x1 < min_xy: x1 = min_xy
            if x2 > max_xy: x2 = max_xy

            intersections.append((x1, x2))

    max_x2 = 0
    for x1, x2 in sorted(intersections):
        if x2 <= max_x2:
            continue

        if x1 > max_x2 + 1:
            x = max_x2 + 1
            print(x * max_xy + y)
            exit()

        max_x2 = x2
