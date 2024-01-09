from itertools import product

lines = open(0).read().split("\n")
abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def priority(line):
    half = int(len(line) / 2)

    for left, right in product(line[:half], line[half:]):
        if left == right:
            return abc.index(left) + 1

total = sum(map(priority, lines))

print(total)
