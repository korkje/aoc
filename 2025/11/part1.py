lines = [line.split() for line in open(0)]
devices = {line[0][:-1]: line[1:] for line in lines}

queue = [("you", set())]
paths = 0

while queue:
    current, seen = queue.pop()
    for device in devices[current]:
        if device == "out":
            paths += 1
        elif device not in seen:
            queue.append((device, seen | {device}))

print(paths)
