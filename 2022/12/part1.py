grid = open(0).read().split('\n')
width, height = len(grid[0]), len(grid)

for y in range(height):
    for x in range(width):
        if grid[y][x] == 'S':
            start = (x, y)
            grid[y] = grid[y].replace('S', 'a')
        elif grid[y][x] == 'E':
            finish = (x, y)
            grid[y] = grid[y].replace('E', 'z')

dxdy = [(1, 0), (0, 1), (-1, 0), (0, -1)]

def oob(x, y):
    return x < 0 or x >= width or y < 0 or y >= height

def bfs(start, finish):
    queue = [(*start, 0)]
    visited = set()

    while queue:
        x, y, length = queue.pop(0)

        for dx, dy in dxdy:
            nx, ny = x + dx, y + dy

            if (x, y) == finish:
                return length
            elif oob(nx, ny):
                continue
            elif (nx, ny) in visited:
                continue
            elif ord(grid[ny][nx]) - ord(grid[y][x]) > 1:
                continue

            visited.add((nx, ny))
            queue.append((nx, ny, length + 1))

print(bfs(start, finish))
