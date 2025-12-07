grid = open(0).read().splitlines()

beams = {(len(grid[0]) // 2, 0)}
splits = 0

while beams:
    next = set()
    for x, y in beams:
        if y == len(grid) - 1:
            break
        elif grid[y][x] == "^":
            splits += 1
            next.add((x - 1, y + 1))
            next.add((x + 1, y + 1))
        else:
            next.add((x, y + 1))
    beams = next

print(splits)
