openclose = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
}

def parse(line):
    stack = []
    for current in line:
        if current in openclose:
            stack.append(current)
        elif not stack or openclose[stack.pop()] != current:
            return current

    return None

illegals = filter(None, map(parse, open(0).read().splitlines()))

scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

print(sum(map(scores.get, illegals)))
