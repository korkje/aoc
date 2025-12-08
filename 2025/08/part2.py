from heapq import heapify, heappop
from itertools import combinations, starmap
from math import dist

lines = open(0).read().splitlines()
boxes = [tuple(map(int, line.split(","))) for line in lines]
distances = list(starmap(lambda a, b: (dist(a, b), a, b), combinations(boxes, 2)))
heapify(distances)

circuits = []
while shortest := heappop(distances):
    _, a, b = shortest
    circuit = {a, b}
    matches = []
    for i, candidate in enumerate(circuits):
        if not circuit.isdisjoint(candidate):
            matches.append(i)

    circuit.update(*map(circuits.pop, reversed(matches)))
    circuits.append(circuit)

    if len(circuit) == len(boxes):
        break

print(a[0] * b[0])
