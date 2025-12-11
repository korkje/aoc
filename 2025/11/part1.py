devices = {k.rstrip(":"): v for k, *v in map(str.split, open(0))}

def paths(d):
    return 1 if d == "out" else sum(map(paths, devices[d]))

print(paths("you"))
