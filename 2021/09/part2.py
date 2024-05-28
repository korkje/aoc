from math import prod

grid = open(0).read().splitlines()

h = len(grid)
w = len(grid[0])

def oob(x, y):
    return x < 0 or x >= w or y < 0 or y >= h

dxdy = [(0, 1), (1, 0), (0, -1), (-1, 0)]
seen = set()
basins = []

for y in range(h):
    for x in range(w):
        if grid[y][x] == '9' or (x, y) in seen:
            continue

        basin = 0
        stack = [(x, y)]
        seen.add((x, y))

        while stack:
            cx, cy = stack.pop()
            basin += 1

            for nx, ny in [(cx + dx, cy + dy) for dx, dy in dxdy]:
                if (nx, ny) in seen or oob(nx, ny) or grid[ny][nx] == '9':
                    continue

                stack.append((nx, ny))
                seen.add((nx, ny))

        basins.append(basin)

print(prod(sorted(basins, reverse=True)[:3]))
