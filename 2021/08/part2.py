def solve(line):
    a, b = line.split(' | ')
    inputs = sorted(map(set, a.split()), key=len)

    # Number of segments:
    # 2: 1
    # 3: 7
    # 4: 4
    # 5: 2, 3, 5
    # 6: 0, 6, 9
    # 7: 8

    # Find 1, 4, 7, and 8 by unique lengths
    _1 = inputs[0]
    _7 = inputs[1]
    _4 = inputs[2]
    _8 = inputs[9]

    # Create lists of unknowns
    _5seg = inputs[3:6]
    _6seg = inputs[6:9]

    # Top is in 7, but not in 1
    _t = _7 - _1

    # 3 is the 5 segment number that contains 1
    _3 = next(filter(lambda x: _1.issubset(x), _5seg))

    # Top left is in 4, but not in 3
    _tl = _4 - _3

    # 6 is the 6 segment number that does not contain 1
    _6 = next(filter(lambda x: not _1.issubset(x), _6seg))

    # Top right is in 8, but not in 6
    _tr = _8 - _6

    # 0 is the 6 segment number that is not 6 and does not contain 4
    _0 = next(filter(lambda x: _6 != x and not _4.issubset(x), _6seg))

    # Middle is in 8, but not in 0
    _m = _8 - _0

    # 9 is the 6 segment number that is not 6 or 0
    _9 = next(filter(lambda x: _6 != x and _0 != x, _6seg))

    # Bottom left is in 8, but not in 9
    _bl = _8 - _9

    # Bottom right the only segment 1 and 6 share
    _br = _1 & _6

    # Bottom is the segment left when subtracting 4 and top from 9
    _b = _9 - _4 - _t

    # Construct remaining digits
    _2 = _t | _tr | _m | _bl | _b
    _5 = _t | _tl | _m | _br | _b

    digits = [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9]
    outputs = map(set, b.split())
    numbers = map(digits.index, outputs)

    return int("".join(map(str, numbers)))

print(sum(map(solve, open(0).read().splitlines())))
