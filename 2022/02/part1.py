file = open(0).read()

score = {
    "A": 1,
    "B": 2,
    "C": 3,
}

xyz_to_abc = {
    "X": "A",
    "Y": "B",
    "Z": "C",
}

total = 0

for line in file.split("\n"):
    [a, b] = line.split(" ")

    b = xyz_to_abc[b]

    if a == b:
        total += score[b] + 3
        continue

    total += score[b]

    match (a, b):
        case ("A", "B"):
            total += 6
        case ("B", "C"):
            total += 6
        case ("C", "A"):
            total += 6

print(total)
