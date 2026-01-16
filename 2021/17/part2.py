from math import ceil, sqrt
import re

x1, x2, y1, y2 = map(int, re.findall(r'(-?\d+)', open(0).read()))

def valid_dy(dy):
    y = 0
    i = 0
    valid = []
    while y >= y1:
        if y1 <= y <= y2:
            valid.append(i)
        y += dy
        i += 1
        dy -= 1
    return valid

min_dx = ceil((sqrt(1 + 8 * x1) - 1) / 2)

def valid_dx(steps):
    valid = []
    for dx in range(min_dx, x2 + 1):
        x = 0
        _dx = dx
        for _ in range(steps):
            x += dx
            dx = dx - 1 if dx > 0 else 0
        if x1 <= x <= x2:
            valid.append(_dx)
    return valid

total = 0
for dy in range(y1, -y1 + 1):
    valid = set()
    for steps in valid_dy(dy):
        valid |= set(valid_dx(steps))
    total += len(set(valid))

print(total)
