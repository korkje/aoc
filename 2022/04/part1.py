file = open(0).read()

def parse(line):
    return map(lambda x: map(int, x.split('-')), line.split(','))

def contains(pair):
    (a1, a2), (b1, b2) = pair
    return (a1 <= b1 and b2 <= a2) or (b1 <= a1 and a2 <= b2)

pairs = map(parse, file.split('\n'))
overlapping = sum(map(contains, pairs))

print(overlapping)
