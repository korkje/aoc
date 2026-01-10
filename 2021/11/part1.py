from itertools import product

grid = [list(map(int, line)) for line in open(0).read().splitlines()]
w, h = len(grid[0]), len(grid)
dxdy = list(product([0, 1, -1], [0, 1, -1]))[1:]

def flash(x, y):
    flashes = 1
    for dx, dy in dxdy:
        nx, ny = x + dx, y + dy
        if not (0 <= nx < w and 0 <= ny < h):
            continue
        grid[ny][nx] += 1
        if grid[ny][nx] == 10:
            flashes += flash(nx, ny)
    return flashes

total = 0
for _ in range(100):
    for x, y in product(range(w), range(h)):
        grid[y][x] += 1
        if grid[y][x] == 10:
            total += flash(x, y)

    for x, y in product(range(w), range(h)):
        if grid[y][x] > 9:
            grid[y][x] = 0

print(total)
