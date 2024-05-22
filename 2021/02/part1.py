def parse(line):
    direction, distance = line.split(' ')
    distance = int(distance)

    if direction == 'forward':
        return (distance, 0)

    return (0, distance if direction == 'down' else -distance)

inputs = map(parse, open(0).readlines())
x, y = tuple(map(sum, zip(*inputs)))

print(x * y)
