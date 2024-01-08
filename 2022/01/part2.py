file = open(0).read()

elves = []

for lines in file.split("\n\n"):
    calories = sum([int(count) for count in lines.split("\n")])
    elves.append(calories)

elves.sort(key=int)

print(sum(elves[-3:]))
