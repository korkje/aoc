line = open(0).read()

for i in range(4, len(line)):
    if (len(set(line[i-4:i])) == 4):
        print(i)
        break
