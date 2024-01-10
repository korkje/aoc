import re

top, bottom = open(0).read().split('\n\n')

*crates, numbers = top.split('\n')
num_stacks = len(range(1, len(numbers), 4))
stacks = {i + 1: [] for i in range(num_stacks)}

for line in reversed(crates):
    count = 1
    for i in range(1, len(line), 4):
        if line[i] != ' ':
            stacks[count].append(line[i])

        count += 1

instructions = [map(int, re.findall(r'\d+', line)) for line in  bottom.split('\n')]

for instruction in instructions:
    count, a, b = instruction

    removed = stacks[a][-count:]
    stacks[a] = stacks[a][:-count]
    stacks[b] += removed

top = ''.join(stack[-1] for stack in stacks.values())

print(top)
