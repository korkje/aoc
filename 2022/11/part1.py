import re
from functools import reduce
from operator import mul

file = open(0).read()
monkeys = {}

for block in file.split('\n\n'):
    lines = block.split('\n')

    id = re.search(r'\d+', lines[0]).group()
    monkey = {}

    monkey['items'] = list(map(int, re.findall(r'\d+', lines[1])))
    monkey['operation'] = lines[2].split(' = ')[1]
    monkey['test'] = int(re.search(r'\d+', lines[3]).group())
    monkey['true'] = re.search(r'\d+', lines[4]).group()
    monkey['false'] = re.search(r'\d+', lines[5]).group()
    monkey['inspections'] = 0

    monkeys[id] = monkey

def perform_operation(item, operation):
    operation = operation.replace('old', str(item))
    return eval(operation)

for _ in range(20):
    for id, monkey in monkeys.items():
        for i, item in enumerate(monkey['items']):
            item = perform_operation(item, monkey['operation']) // 3

            if item % monkey['test'] == 0:
                target = monkey['true']
            else:
                target = monkey['false']

            monkeys[target]['items'].append(item)
            monkey['inspections'] += 1

        monkey['items'] = []

inspections = sorted([monkey['inspections'] for monkey in monkeys.values()], key=int)

print(reduce(mul, inspections[-2:]))
