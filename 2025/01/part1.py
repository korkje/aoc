lines = open(0).read().splitlines()

dial = 50
zeroes = 0

for line in lines:
    steps = int(line[1:]) * (1 if line[0] == 'R' else -1)
    dial = (dial + steps) % 100

    if dial == 0:
        zeroes += 1

print(zeroes)
