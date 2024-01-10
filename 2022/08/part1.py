from itertools import product

grid = open(0).read().split('\n')
width, height = len(grid[0]), len(grid)
size = len(grid)

up = [[0] * width for _ in range(height)]
for x in range(width):
    m = 0
    for y in range(height - 1, -1, -1):
        h = int(grid[y][x])
        if h > m:
            m = h
        up[y][x] = m

down = [[0] * width for _ in range(height)]
for x in range(width):
    m = 0
    for y in range(height):
        h = int(grid[y][x])
        if h > m:
            m = h
        down[y][x] = m

right = [[0] * width for _ in range(height)]
for y in range(height):
    m = 0
    for x in range(width):
        h = int(grid[y][x])
        if h > m:
            m = h
        right[y][x] = m

left = [[0] * width for _ in range(height)]
for y in range(height):
    m = 0
    for x in range(width - 1, -1, -1):
        h = int(grid[y][x])
        if h > m:
            m = h
        left[y][x] = m

def visible(x, y):
    u = up[y + 1][x]
    d = down[y - 1][x]
    l = left[y][x + 1]
    r = right[y][x - 1]
    return min(u, d, l, r) < int(grid[y][x])

inside = 0

for y in range(1, height - 1):
    for x in range(1, width - 1):
        if visible(x, y):
            inside += 1

outside = width * 2 + height * 2 - 4
print(outside + inside)
