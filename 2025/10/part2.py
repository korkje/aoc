from itertools import starmap
from scipy.optimize import LinearConstraint, milp

def parse(line):
    _, *schemas, reqs = line.split()
    schemas = [set(map(int, s[1:-1].split(","))) for s in schemas]
    reqs = tuple(map(int, (reqs[1:-1].split(","))))
    return (schemas, reqs)

def solve(schemas, target):
    m, n = len(schemas), len(target)
    A = [[int(i in schemas[j]) for j in range(m)] for i in range(n)]
    result = milp([1] * m, integrality=1, constraints=[LinearConstraint(A, target, target)])
    return int(result.fun)

print(sum(starmap(solve, map(parse, open(0)))))

