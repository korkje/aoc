from itertools import cycle

rocks = [
    [0, 1, 2, 3],
    [1 + 2j, 1j, 1 + 1j, 2 + 1j, 1],
    [2 + 2j, 2 + 1j, 0, 1, 2],
    [3j, 2j, 1j, 0j],
    [1j, 1 + 1j, 0, 1],
]

winds = cycle(enumerate([1 if w == '>' else -1 for w in open(0).read()]))
blocked = {a - 1j for a in range(7)}
skyline = [-1] * 7
top = 0
seen = {}
offset = 0
target = 1_000_000_000_000
i = 0

while i < target:
    ri = i % len(rocks)
    rock = {z + complex(2, top + 3) for z in rocks[ri]}

    for wi, wind in winds:
        move_h = {z + wind for z in rock}

        if all(0 <= z.real < 7 and z not in blocked for z in move_h):
            rock = move_h

        move_v = {z - 1j for z in rock}

        if move_v & blocked:
            blocked |= rock
            top = max(top, max(z.imag for z in rock) + 1)
            for z in rock:
                a, b = int(z.real), int(z.imag)
                skyline[a] = max(skyline[a], b)
            break
        else:
            rock = move_v

    key = (ri, wi, tuple(b - top for b in skyline))
    if key in seen:
        seen_i, seen_top = seen[key]
        loop_length = i - seen_i
        repetitions = (target - i) // loop_length
        offset = repetitions * (top - seen_top)
        i += repetitions * loop_length
        seen = {}

    seen[key] = (i, top)
    i += 1

print(int(top + offset))
