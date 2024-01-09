file = open(0).read()

total = 0

for line in file.split("\n"):
    [a, b] = line.split(" ")

    a = "ABC".index(a)
    b = "XYZ".index(b)

    total += b + 1

    if a == b:
        total += 3
    elif a == (b - 1) % 3:
        total += 6

print(total)
