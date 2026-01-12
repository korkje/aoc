from collections import Counter
from functools import cache

tmp, ins = open(0).read().split("\n\n")
ins = {k: v for k, v in [line.split(" -> ") for line in ins.splitlines()]}

@cache
def solve(a, c, n=40):
    b = ins[a + c]
    return sum([] if n == 1 else [
        solve(a, b, n - 1),
        solve(b, c, n - 1),
    ], Counter(b))

c = sum(map(solve, tmp, tmp[1:]), Counter(tmp))

print(max(c.values()) - min(c.values()))
