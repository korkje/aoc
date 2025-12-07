from functools import reduce
from operator import add, mul
import re

lines = open(0).read().splitlines()
cols = zip(*[re.split(r"\s+", line.strip()) for line in lines])

operators = { "+": add, "*": mul }

print(sum(reduce(operators[o], map(int, ns)) for *ns, o in cols))
