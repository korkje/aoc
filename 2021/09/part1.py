grid = open(0).read().splitlines()

h = len(grid)
w = len(grid[0])

def oob(x, y):
    return x < 0 or x >= w or y < 0 or y >= h

dxdy = [(0, 1), (1, 0), (0, -1), (-1, 0)]

def lowest_neighbor(x, y):
    lowest = float('inf')
    for dx, dy in dxdy:
        nx, ny = x + dx, y + dy
        if oob(nx, ny):
            continue
        lowest = min(lowest, int(grid[ny][nx]))
    return lowest

risk = 0
for y in range(h):
    for x in range(w):
        n = int(grid[y][x])
        if n < lowest_neighbor(x, y):
            risk += n + 1

print(risk)
