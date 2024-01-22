import re

board_str, instructions_str = open(0).read().split('\n\n')
board = board_str.split('\n')
instructions = [int(x) if x.isnumeric() else x for x in re.findall(r'\d+|\w', instructions_str)]

width = max(map(len, board))
height = len(board)

def oob(x, y):
    if not (0 <= x < width and 0 <= y < height):
        return True

    try:
        if board[y][x] not in '.#':
            return True
    except:
        return True

    return False

dxdy = [(0, -1), (1, 0), (0, 1), (-1, 0)]

def advance(x, y, direction):
    dx, dy = dxdy['NESW'.index(direction)]

    x += dx
    y += dy

    if not oob(x, y):
        return x, y, direction

    match direction:
        case 'N':
            if x < 50:
                direction = 'E'
                y = 50 + x
                x = 50
            elif x < 100:
                direction = 'E'
                y = 150 + x - 50
                x = 0
            else:
                direction = 'N'
                y = 199
                x = x - 100
        case 'S':
            if x < 50:
                direction = 'S'
                y = 0
                x = 100 + x
            elif x < 100:
                direction = 'W'
                y = 150 + x - 50
                x = 49
            else:
                direction = 'W'
                y = 50 + x - 100
                x = 99
        case 'W':
            if y < 50:
                direction = 'E'
                y = 149 - y
                x = 0
            elif y < 100:
                direction = 'S'
                x = y - 50
                y = 100
            elif y < 150:
                direction = 'E'
                y = 149 - y
                x = 50
            else:
                direction = 'S'
                x = 50 + y - 150
                y = 0
        case 'E':
            if y < 50:
                direction = 'W'
                y = 149 - y
                x = 99
            elif y < 100:
                direction = 'N'
                x = 100 + y - 50
                y = 49
            elif y < 150:
                direction = 'W'
                y = 149 - y
                x = 149
            else:
                direction = 'N'
                x = 50 + y - 150
                y = 149

    return x, y, direction

x, y, direction = board[0].index('.'), 0, 'E'

for instruction in instructions:
    if isinstance(instruction, str):
        direction = 'NESW'[('NESW'.index(direction) + (1 if instruction == 'R' else -1)) % 4]
        continue

    for _ in range(instruction):
        nx, ny, ndirection = advance(x, y, direction)
        if board[ny][nx] == '#':
            break

        x, y, direction = nx, ny, ndirection

print(1000 * (y + 1) + 4 * (x + 1) + 'ESWN'.index(direction))
