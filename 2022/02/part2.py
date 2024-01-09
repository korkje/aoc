file = open(0).read()

total = 0

for line in file.split("\n"):
    [a, b] = line.split(" ")

    a = "ABC".index(a)
    b = "XYZ".index(b)

    total += (a + b - 1) % 3 + 1 + b * 3

print(total)
