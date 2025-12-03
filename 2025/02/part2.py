from functools import cache

line = open(0).read().strip()
ranges = map(lambda x: map(int, x.split("-")), line.split(","))
invalids = []

@cache
def factors(n):
    return [i for i in range(1, n // 2 + 1) if n % i == 0]

def repeats(id, n):
    first = id[:n]
    for i in range(n, len(id), n):
        if id[i:i+n] != first:
            return False
    return True

for a, b in ranges:
    for id in range(a, b + 1):
        id = str(id)
        for factor in factors(len(id)):
            if repeats(id, factor):
                invalids.append(int(id))
                break

print(sum(invalids))
