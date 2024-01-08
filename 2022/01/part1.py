file = open(0).read()

most = 0

for lines in file.split("\n\n"):
    calories = sum([int(count) for count in lines.split("\n")])
    most = max(most, calories)

print(most)
