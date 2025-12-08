from heapq import nlargest, nsmallest
from itertools import combinations, starmap
from math import dist, prod

lines = open(0).read().splitlines()
boxes = [tuple(map(int, line.split(","))) for line in lines]
distances = list(starmap(lambda a, b: (dist(a, b), a, b), combinations(boxes, 2)))

circuits = []
for _, a, b in nsmallest(1000, distances):
    circuit = {a, b}
    matches = []
    for i, candidate in enumerate(circuits):
        if not circuit.isdisjoint(candidate):
            matches.append(i)

    circuit.update(*map(circuits.pop, reversed(matches)))
    circuits.append(circuit)

print(prod(map(len, nlargest(3, circuits, key=len))))
