from itertools import product

lines = open(0).read().split("\n")
abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
total = 0

for line in lines:
    half = int(len(line) / 2)

    for left, right in product(line[:half], line[half:]):
        if left == right:
            total += abc.index(left) + 1
            break

print(total)
