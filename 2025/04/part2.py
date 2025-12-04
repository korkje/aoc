from functools import cache

grid = open(0).read().splitlines()

rolls = {
    x + y * 1j
    for y, row in enumerate(grid)
    for x, cell in enumerate(row)
    if cell == '@'
}

offsets = [-1-1j, -1j, 1-1j, -1, 1, -1+1j, 1j, 1+1j]

@cache
def adjacents(z):
    return {z + d for d in offsets}

def accessible(z):
    return len(adjacents(z) & rolls) < 4

removed = 0
while remove := set(filter(accessible, rolls)):
    rolls -= remove
    removed += len(remove)

print(removed)
