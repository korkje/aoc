from functools import reduce
from operator import mul

file = open(0).read()
monkeys = {}

for block in file.split('\n\n'):
    lines = block.split('\n')

    monkey = {}
    monkey['items'] = [int(num) for num in lines[1].split(': ')[1].split(', ')]
    monkey['operation'] = eval('lambda old: ' + lines[2].split(' = ')[1])
    monkey['test'] = [int(line.split()[-1]) for line in lines[3:]]
    monkey['inspections'] = 0

    id = int(lines[0].split()[1][:-1])
    monkeys[id] = monkey

mod = 1

for monkey in monkeys.values():
    divisor = monkey['test'][0]
    mod *= divisor

for _ in range(10_000):
    for monkey in monkeys.values():
        divisor, true, false = monkey['test']

        for i, item in enumerate(monkey['items']):
            item = monkey['operation'](item) % mod
            target = true if item % divisor == 0 else false
            monkeys[target]['items'].append(item)

        monkey['inspections'] += len(monkey['items'])
        monkey['items'] = []

inspections = sorted([monkey['inspections'] for monkey in monkeys.values()], key=int)

print(reduce(mul, inspections[-2:]))
