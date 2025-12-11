from functools import cache

devices = {k.rstrip(":"): v for k, *v in map(str.split, open(0))}

@cache
def paths(d, r):
    return int(not r) if d == "out" else sum(paths(d, r - {d}) for d in devices[d])

print(paths("svr", frozenset(["dac", "fft"])))
