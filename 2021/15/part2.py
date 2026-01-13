from heapq import heappop, heappush

grid = open(0).read().splitlines()
w, h = len(grid[0]), len(grid)
n = 5

q = [(0, 0, 0)]
seen = {(0, 0)}

while len(q):
    c, x, y = heappop(q)

    if x == w * n - 1 and y == h * n - 1:
        break

    for dx, dy in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
        nx, ny = x + dx, y + dy

        if not (0 <= nx < w * n and 0 <= ny < h * n):
            continue

        if (nx, ny) in seen:
            continue

        r = int(grid[ny % h][nx % w]) + (nx // w) + (ny // h)
        r = (r - 1) % 9 + 1

        heappush(q, (c + r, nx, ny))
        seen.add((nx, ny))

print(c)