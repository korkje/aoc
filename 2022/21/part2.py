from cachetools import cached
from sympy import sympify, solve

def parse(line):
    lr = line.strip().split(': ')
    key, right = lr

    if key == 'humn':
        return (key, 'x')

    if right.isnumeric():
        return (key, right)

    a, operator, b = right.split(' ')

    if key == 'root':
        return (key, (a, b, '=='))

    return (key, (a, b, operator))

monkeys = {key: value for key, value in map(parse, open(0))}

@cached(cache={})
def equation(key):
    value = monkeys[key]

    if (isinstance(value, str)):
        return value

    a, b, operator = value
    return f'({equation(a)}{operator}{equation(b)})'

answer = solve(sympify(equation('root'), evaluate=False))[0]
print(int(answer))
