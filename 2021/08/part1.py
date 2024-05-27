def value(digits):
    return sum([1 if len(digit) in [2, 3, 4, 7] else 0 for digit in digits.split()])

outputs = [line.split(' | ')[1] for line in open(0).read().splitlines()]
print(sum(map(value, outputs)))
