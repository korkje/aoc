from math import prod
from operator import eq, gt, lt

binary = list("".join(bin(int(c, 16))[2:].zfill(4) for c in open(0).read()))

def num(x):
    return int("".join(x), 2)

def take(x, n):
    res, x[:] = x[:n], x[n:]
    return res

def parse(binary):
    _ = num(take(binary, 3))
    type_id = num(take(binary, 3))

    if type_id == 4:
        literal = ""
        while True:
            group = take(binary, 5)
            prefix, number = num(group[0]), "".join(group[1:])
            literal += number
            if prefix == 0:
                break
        data = num(literal)
    else:
        data = []
        if num(take(binary, 1)) == 0:
            packets_len = num(take(binary, 15))
            inner = take(binary, packets_len)
            while inner:
                data.append(parse(inner))
        else:
            num_packets = num(take(binary, 11))
            for _ in range(num_packets):
                data.append(parse(binary))

    return (type_id, data)

def value(packet):
    type_id, data = packet

    if type_id < 4:
        return [sum, prod, min, max][type_id](map(value, data))

    if type_id > 4:
        return [gt, lt, eq][type_id - 5](value(data[0]), value(data[1]))

    return data

print(value(parse(binary)))
