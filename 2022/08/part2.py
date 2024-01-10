from itertools import product
from functools import reduce
from operator import mul

grid = open(0).read().split('\n')
width, height = len(grid[0]), len(grid)

def distance(x, y, dx, dy):
    h = int(grid[y][x])
    count = 0
    while True:
        x += dx
        y += dy
        if x < 0 or x >= width or y < 0 or y >= height:
            return count
        if int(grid[y][x]) >= h:
            return count + 1
        count += 1

dxdy = ((0, 1), (0, -1), (1, 0), (-1, 0))
def score(x, y):
    return reduce(mul, [distance(x, y, dx, dy) for (dx, dy) in dxdy])

scores = [score(x, y) for (x, y) in product(range(width), range(height))]
print(max(scores))
