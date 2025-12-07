import re

lines = open(0).read().splitlines()
rotated = "\n".join(map("".join, zip(*map(reversed, lines))))
groups = re.split(r"\n\s+\n", rotated)
problems = [(g[:-1].strip().split(), g[-1]) for g in groups]

print(sum(eval(o.join(ns)) for ns, o in problems))
