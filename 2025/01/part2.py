lines = open(0).read().splitlines()

dial = 50
zeroes = 0

for line in lines:
    direction = line[0]
    steps = int(line[1:])

    if direction == 'L':
        dial = (100 - dial) % 100

    first = min(steps, 100 - dial)
    dial = (dial + first) % 100

    if dial == 0:
        zeroes += 1

    remaining = steps - first

    if remaining > 0:
        dial = (dial + remaining) % 100
        zeroes += remaining // 100

    if direction == 'L':
        dial = (100 - dial) % 100

print(zeroes)
