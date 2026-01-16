import re

*_, y1, y2 = map(int, re.findall(r'(-?\d+)', open(0).read()))

def valid(dy):
    y = 0
    while y >= y1:
        if y1 <= y <= y2:
            return True
        y += dy
        dy -= 1
    return False

dy = next(filter(valid, range(-y1, 0, -1)))

print(sum(range(1, dy + 1)))
