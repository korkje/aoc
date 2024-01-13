from itertools import cycle

rocks = [
    [0, 1, 2, 3],
    [1 + 2j, 1j, 1 + 1j, 2 + 1j, 1],
    [2 + 2j, 2 + 1j, 0, 1, 2],
    [3j, 2j, 1j, 0j],
    [1j, 1 + 1j, 0, 1],
]

winds = cycle([1 if w == '>' else -1 for w in open(0).read()])
blocked = {a - 1j for a in range(7)}
top = 0
i = 0

while i < 2022:
    rock = {z + complex(2, top + 3) for z in rocks[i % 5]}

    for wind in winds:
        move_h = {z + wind for z in rock}

        if all(0 <= z.real < 7 and z not in blocked for z in move_h):
            rock = move_h

        move_v = {z - 1j for z in rock}

        if move_v & blocked:
            blocked |= rock
            top = max(top, max(z.imag for z in rock) + 1)
            break
        else:
            rock = move_v

    i += 1

print(int(top))
