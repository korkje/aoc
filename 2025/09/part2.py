from heapq import heapify, heappop
from itertools import combinations, pairwise, starmap
from bisect import bisect

tiles = [tuple(map(int, line.split(","))) for line in open(0)]

edges = { "h": [], "v": [] }
for a, b in [*pairwise(tiles), (tiles[-1], tiles[0])]:
    ax, ay = a
    bx, by = b
    if ay == by:
        edges["h"].append((ay, *sorted([ax, bx])))
    else:
        edges["v"].append((ax, *sorted([ay, by])))

edges["h"].sort()
edges["v"].sort()

def get_area(a, b):
    w = abs(b[0] - a[0]) + 1
    h = abs(b[1] - a[1]) + 1
    return -(w * h), a, b

areas = list(starmap(get_area, combinations(tiles, 2)))
heapify(areas)

def valid(ax, bx, ay, by):
    lo = bisect(edges["h"], (ay + 1,))
    hi = bisect(edges["h"], (by,))
    for _, cx, dx in edges["h"][lo:hi]:
        if cx < bx and dx > ax:
            return False

    lo = bisect(edges["v"], (ax + 1,))
    hi = bisect(edges["v"], (bx,))
    for _, cy, dy in edges["v"][lo:hi]:
        if cy < by and dy > ay:
            return False

    return True

while largest := heappop(areas):
    area, a, b = largest
    ax, ay = a
    bx, by = b
    ax, bx = sorted([ax, bx])
    ay, by = sorted([ay, by])

    if valid(ax, bx, ay, by):
        break

print(-area)
