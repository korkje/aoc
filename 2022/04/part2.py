file = open(0).read()

def parse(line):
    return map(lambda x: map(int, x.split('-')), line.split(','))

def overlaps(pair):
    (a1, a2), (b1, b2) = pair
    return a1 <= b1 <= a2 or b1 <= a1 <= b2

pairs = map(parse, file.split('\n'))
overlapping = sum(map(overlaps, pairs))

print(overlapping)
