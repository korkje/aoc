file = open(0).read()

def listify(e):
    return [e] if isinstance(e, int) else e

def compare(a, b):
    if isinstance(a, int) and isinstance(b, int):
        return a - b
    elif isinstance(a, int) or isinstance(b, int):
        return compare(listify(a), listify(b))

    for res in map(compare, a, b):
        if res: return res

    return len(a) - len(b)

result = 0

for i, pair in enumerate(file.split('\n\n')):
    first, second = map(eval, pair.split('\n'))
    ordered = compare(first, second) < 0

    if ordered:
        result += i + 1

print(result)
