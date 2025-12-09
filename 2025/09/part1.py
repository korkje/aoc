from heapq import heapify, heappop
from itertools import combinations, starmap

tiles = [tuple(map(int, line.split(","))) for line in open(0)]

def get_area(a, b):
    w = abs(b[0] - a[0]) + 1
    h = abs(b[1] - a[1]) + 1
    return -(w * h)

areas = list(starmap(get_area, combinations(tiles, 2)))
heapify(areas)

print(-heappop(areas))

