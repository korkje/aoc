from heapq import heappop, heappush

grid = open(0).read().splitlines()
w, h = len(grid[0]), len(grid)

q = [(0, 0, 0)]
seen = {(0, 0)}

while len(q):
    c, x, y = heappop(q)

    if x == w - 1 and y == h - 1:
        break

    for dx, dy in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
        nx, ny = x + dx, y + dy

        if not (0 <= nx < w and 0 <= ny < h):
            continue

        if (nx, ny) in seen:
            continue

        heappush(q, (c + int(grid[ny][nx]), nx, ny))
        seen.add((nx, ny))

print(c)