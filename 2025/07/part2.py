from functools import cache

grid = open(0).read().splitlines()

@cache
def paths(x, y):
    if y == len(grid) - 1:
        return 1
    elif grid[y][x] == "^":
        return paths(x - 1, y + 1) + paths(x + 1, y + 1)
    else:
        return paths(x, y + 1)

print(paths(len(grid[0]) // 2, 0))
