file = open(0).read()
cycle = 0

register = 1
signals = []

screen = []
line = []

for instruction in file.split('\n'):
    cmd = instruction[:4]

    match cmd:
        case 'noop':
            cycles = 1
            add = 0
        case 'addx':
            cycles = 2
            add = int(instruction[5:])

    while cycles:
        pixel = cycle % 40
        cycle += 1
        cycles -= 1

        if (register - 1 <= pixel <= register + 1):
            line.append('#')
        else:
            line.append('.')

        if (pixel == 39):
            screen.append(''.join(line))
            line = []

    register += add

print('\n'.join(screen))
