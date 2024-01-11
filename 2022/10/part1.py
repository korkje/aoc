file = open(0).read()
cycle = 0

register = 1
signals = []

for line in file.split('\n'):
    cmd = line[:4]

    match cmd:
        case 'noop':
            cycles = 1
            add = 0
        case 'addx':
            cycles = 2
            add = int(line[5:])

    while cycles:
        cycle += 1
        cycles -= 1

        if (cycle % 40 == 20):
            signals.append(register * cycle)

    register += add

print(sum(signals))
