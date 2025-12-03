banks = open(0).read().splitlines()
joltages = []

for bank in banks:
    joltage = "00"

    for i in range(len(bank) - 1):
        for j in range(i + 1, len(bank)):
            candidate = bank[i] + bank[j]
            if candidate > joltage:
                joltage = candidate

    joltages.append(int(joltage))

print(sum(joltages))
