from operator import ge, lt

def parse_bin(line):
    return int(line, 2)

lines = open(0).read().splitlines()
bits = len(lines[0])
nums = list(map(parse_bin, lines))

def find(candidates, oper):
    for i in range(bits):
        zeros, ones = 0, 0
        mask = 1 << (bits - i - 1)

        for num in candidates:
            if num & mask:
                ones += 1
            else:
                zeros += 1

        target = mask if oper(ones, zeros) else 0
        candidates = list(filter(lambda num: num & mask == target, candidates))

        if len(candidates) == 1:
            return candidates[0]

oxygen_generator_rating = find(nums, ge)
co2_scrubber_rating = find(nums, lt)

print(oxygen_generator_rating * co2_scrubber_rating)
