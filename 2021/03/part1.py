def parse_bin(line):
    return int(line, 2)

lines = open(0).read().splitlines()
bits = len(lines[0])
counts = [[0, 0] for _ in range(bits)]

for n in map(parse_bin, lines):
    for i in range(bits):
        counts[i][1 if n & 1 << i else 0] += 1

gamma, epsilon = 0, 0

for i, (zeros, ones) in enumerate(counts):
    if zeros > ones:
        gamma |= 1 << i
    else:
        epsilon |= 1 << i

print(gamma * epsilon)
