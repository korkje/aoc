from cachetools import cached

def parse(line):
    lr = line.strip().split(': ')
    key, right = lr

    if right.isnumeric():
        return (key, int(right))

    a, operator, b = right.split(' ')
    return (key, (a, b, eval(f'lambda a, b: a {operator} b')))

monkeys = {key: value for key, value in map(parse, open(0))}

@cached(cache={})
def calc(key):
    value = monkeys[key]

    if isinstance(value, int):
        return value

    a, b, func = value
    return int(func(calc(a), calc(b)))

print(calc('root'))
