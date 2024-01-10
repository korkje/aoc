from itertools import product
from math import sqrt

lines = open(0).read().split('\n')

def touches(head, tail):
    hx, hy = head
    tx, ty = tail

    return max(abs(hx - tx), abs(hy - ty)) <= 1

dxdy = list(product((-1, 0, 1), repeat=2))

def distance(to):
    x, y = to

    def _distance(canditate):
        cx, cy = canditate
        return sqrt((x - cx) ** 2 + (y - cy) ** 2)

    return _distance


def follow(head, tail):
    tx, ty = tail
    candidates = [(tx + dx, ty + dy) for dx, dy in dxdy]

    return min(candidates, key=distance(head))

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

snake = [(0, 0)] * 10
visited = {snake[-1]}

for line in lines:
    dir, length = line[0], int(line[2:])

    for _ in range(length):
        snake[0] = move(snake[0], dir)

        for i in range(0, len(snake) - 1):
            if not touches(snake[i], snake[i + 1]):
                snake[i + 1] = follow(snake[i], snake[i + 1])

        visited.add(snake[-1])

print(len(visited))
