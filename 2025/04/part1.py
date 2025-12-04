grid = open(0).read().splitlines()

rolls = {
    x + y * 1j
    for y, row in enumerate(grid)
    for x, cell in enumerate(row)
    if cell == '@'
}

offsets = [-1-1j, -1j, 1-1j, -1, 1, -1+1j, 1j, 1+1j]

def accessible(z):
    return len({z + d for d in offsets} & rolls) < 4

print(sum(accessible(z) for z in rolls))
