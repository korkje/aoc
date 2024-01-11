grid = open(0).read().split('\n')
width, height = len(grid[0]), len(grid)

starts = []

for y in range(height):
    for x in range(width):
        if grid[y][x] == 'a':
            starts.append((x, y))
        elif grid[y][x] == 'S':
            starts.append((x, y))
            grid[y] = grid[y].replace('S', 'a')
        elif grid[y][x] == 'E':
            finish = (x, y)
            grid[y] = grid[y].replace('E', 'z')

dxdy = [(1, 0), (0, 1), (-1, 0), (0, -1)]

def oob(x, y):
    try:
        return x < 0 or x >= width or y < 0 or y >= height
    except:
        raise Exception(x, y)

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

    return float('inf')

print(min([bfs(start, finish) for start in starts]))
