def cost(position, target):
    d = abs(position - target)
    return (d * (d + 1)) // 2

positions = sorted(map(int, open(0).read().split(',')))
total = float('inf')

for target in range(positions[0], positions[-1] + 1):
    total = min(total, sum(map(lambda p: cost(p, target), positions)))

print(total)
