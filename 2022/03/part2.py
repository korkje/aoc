from itertools import product

lines = open(0).read().split("\n")
abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
groups = [lines[i:i + 3] for i in range(0, len(lines), 3)]

def priority(group):
    for first, second, third in product(*group):
        if first == second == third:
            return abc.index(first) + 1

total = sum(priority(group) for group in groups)

print(total)
