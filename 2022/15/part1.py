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

target_y = 2_000_000

intersections = []
for sensor, reach in map(parse, open(0).readlines()):
    res = intersection(sensor, reach, target_y)
    if res is not None:
        x1, x2 = res
        intersections.append((x1, x2))

intersections.sort()
covered = []

while intersections:
    x1, x2 = intersections.pop(0)

    while intersections and intersections[0][0] <= x2:
        x2 = max(x2, intersections.pop(0)[1])

    covered.append((x1, x2))

print(sum(x2 - x1 for x1, x2 in covered))
