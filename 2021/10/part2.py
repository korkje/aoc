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
            return None

    return "".join(map(openclose.get, reversed(stack)))

endings = filter(None, map(parse, open(0).read().splitlines()))

points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

def score(ending):
    total = 0

    for char in ending:
        total *= 5
        total += points[char]

    return total

scores = sorted(map(score, endings))

print(scores[len(scores) // 2])
