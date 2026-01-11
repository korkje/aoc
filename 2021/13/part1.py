import re

dots, folds = open(0).read().split("\n\n")
dots = {tuple(map(int, xy.split(","))) for xy in dots.splitlines()}

for line in folds.splitlines():
    match = re.search(r'([xy])=(\d+)', line)
    axis, n = match[1], int(match[2])

    if axis == "x":
        a = {(x, y) for x, y in dots if x < n}
        b = {(n - (x - n), y) for x, y in dots if x > n}
    else:
        a = {(x, y) for x, y in dots if y < n}
        b = {(x, n - (y - n)) for x, y in dots if y > n}

    dots = a | b
    break

print(len(dots))
