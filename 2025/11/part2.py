from collections import deque, defaultdict

lines = [line.split() for line in open(0)]
devices = {line[0][:-1]: line[1:] for line in lines}
required = {"dac", "fft"}

states = defaultdict(int, {("svr", frozenset()): 1})
queue = deque([("svr", frozenset())])
paths = 0

while queue:
    current, seen = queue.popleft()
    count = states[(current, seen)]
    states[(current, seen)] = 0

    for device in devices[current]:
        if device == "out":
            if required.issubset(seen):
                paths += count
        else:
            state = (device, seen | (required & {device}))
            if states[state] == 0:
                queue.append(state)

            states[state] += count

print(paths)
