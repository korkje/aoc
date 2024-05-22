x, y, aim = 0, 0, 0
for line in open(0).readlines():
    direction, distance = line.split(' ')
    distance = int(distance)

    if direction == 'forward':
        x += distance
        y += aim * distance
    else:
        aim += distance if direction == 'down' else -distance

print(x * y)
