import re

board_str, instructions_str = open(0).read().split('\n\n')
board = board_str.split('\n')
instructions = [int(x) if x.isnumeric() else x for x in re.findall(r'\d+|\w', instructions_str)]

width = max(map(len, board))
height = len(board)

north_firsts = []
for x in range(width):
    for y in range(height - 1, -1, -1):
        try:
            if board[y][x] in '.#':
                north_firsts.append(y)
                break
        except:
            pass

south_firsts = []
for x in range(width):
    for y in range(height):
        try:
            if board[y][x] in '.#':
                south_firsts.append(y)
                break
        except:
            pass

west_firsts = []
for y in range(height):
    for x in range(width - 1, -1, -1):
        try:
            if board[y][x] in '.#':
                west_firsts.append(x)
                break
        except:
            pass

east_firsts = []
for y in range(height):
    for x in range(width):
        try:
            if board[y][x] in '.#':
                east_firsts.append(x)
                break
        except:
            pass

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
        return x, y

    match direction:
        case 'N':
            y = north_firsts[x]
        case 'S':
            y = south_firsts[x]
        case 'W':
            x = west_firsts[y]
        case 'E':
            x = east_firsts[y]

    return x, y

x, y, direction = board[0].index('.'), 0, 'E'

for instruction in instructions:
    if isinstance(instruction, str):
        direction = 'NESW'[('NESW'.index(direction) + (1 if instruction == 'R' else -1)) % 4]
        continue

    for _ in range(instruction):
        nx, ny = advance(x, y, direction)
        if board[ny][nx] == '#':
            break

        x, y = nx, ny

print(1000 * (y + 1) + 4 * (x + 1) + 'ESWN'.index(direction))
