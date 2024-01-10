lines = open(0).read().split('\n')

def touches(head, tail):
    hx, hy = head
    tx, ty = tail

    return max(abs(hx - tx), abs(hy - ty)) <= 1

dxdy = ((0, 1), (1, 0), (0, -1), (-1, 0))

def follow(head, tail):
    hx, hy = head

    for dx, dy in dxdy:
        nx, ny = hx + dx, hy + dy
        if touches((nx, ny), tail):
            return (nx, ny)

dirs = {
    'U': (0, -1),
    'D': (0, 1),
    'L': (-1, 0),
    'R': (1, 0),
}

def move(head, dir):
    dx, dy = dirs[dir]
    hx, hy = head

    return (hx + dx, hy + dy)

head = (0, 0)
tail = (0, 0)

visited = {tail}

for line in lines:
    dir, length = line[0], int(line[2:])

    for _ in range(length):
        head = move(head, dir)

        if not touches(head, tail):
            tail = follow(head, tail)
            visited.add(tail)

        visited.add(tail)

print(len(visited))
