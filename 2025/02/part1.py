line = open(0).read().strip()
ranges = map(lambda x: map(int, x.split("-")), line.split(","))
invalids = []

for a, b in ranges:
    for id in range(a, b + 1):
        id = str(id)
        if len(id) % 2 == 0:
            half = len(id) // 2
            if (id[:half] == id[half:]):
                invalids.append(int(id))

print(sum(invalids))
