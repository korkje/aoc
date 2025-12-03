banks = open(0).read().splitlines()
joltages = []

for bank in banks:
    last = -1
    joltage = ["0"] * 12

    for i in range(0, 12):
        for j in range(last + 1, len(bank) - (11 - i)):
            candidate = bank[j]
            if candidate > joltage[i]:
                joltage[i] = candidate
                last = j

    joltages.append(int("".join(joltage)))

print(sum(joltages))
