from itertools import product, batched

lines = open(0).read().split("\n")
abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def priority(group):
    for first, second, third in product(*group):
        if first == second == third:
            return abc.index(first) + 1

total = sum(map(priority, batched(lines, 3)))

print(total)
