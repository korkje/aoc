from functools import cache
from itertools import starmap
import re

*shapes, regions = open(0).read().split("\n\n")
shapes = [s.split(":\n")[1].replace("\n", "") for s in shapes]
regions = [list(map(int, re.findall(r"\d+", r))) for r in regions.split("\n")]

@cache
def area(i):
    return sum(c == "#" for c in shapes[i])

def valid(x, y, *s):
    if (x - x % 3) * (y - y % 3) >= sum(s) * 9:
        return True

    if x * y < sum(area(i) * n for i, n in enumerate(s)):
        return False

    raise Exception("NP-hard")

print(sum(starmap(valid, regions)))
