from functools import reduce
from operator import add, mul
from itertools import zip_longest
import re

lines = open(0).read().splitlines()
rotated = "\n".join(map("".join, zip_longest(*lines[:-1], fillvalue=" ")))
symbols = re.split(r"\s+", lines[-1].strip())

operators = { "+": add, "*": mul }

problems = zip(
    [operators[s] for s in symbols],
    [[int(n.strip()) for n in ns.split("\n")] for ns in re.split(r"\n\s+\n", rotated)],
)

print(sum(reduce(o, ns) for o, ns in problems))
