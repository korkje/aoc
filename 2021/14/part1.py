from collections import Counter

tmp, ins = open(0).read().split("\n\n")
ins = {k: v for k, v in [line.split(" -> ") for line in ins.splitlines()]}

for _ in range(10):
    n = tmp[0]
    for k in tmp[1:]:
        n += ins[n[-1] + k] + k
    tmp = n

c = Counter(tmp)

print(max(c.values()) - min(c.values()))
