
def listify(e):
    return [e] if isinstance(e, int) else e

def compare(a, b):
    if isinstance(a, int) and isinstance(b, int):
        return a - b

    if isinstance(a, int) or isinstance(b, int):
        return compare(listify(a), listify(b))

    for res in map(compare, a, b):
        if res: return res

    return len(a) - len(b)

div1 = 1
div2 = 2

for packet in map(eval, open(0).read().split()):
    if (compare(packet, [[2]]) < 0):
        div1 += 1
        div2 += 1
    elif (compare(packet, [[6]]) < 0):
        div2 += 1

print(div1 * div2)
