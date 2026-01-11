from collections import defaultdict
from functools import cache

graph = defaultdict(set)

for line in open(0).read().splitlines():
    a, b = line.split("-")
    graph[a].add(b)
    graph[b].add(a)

@cache
def search(a, b, seen=frozenset(), twice=None):
    if a == b:
        return 1
    elif a in seen:
        if twice or a == "start":
            return 0
        twice = a
    elif a.islower():
        seen |= {a}

    return sum(search(n, b, seen, twice) for n in graph[a])

print(search("start", "end"))
