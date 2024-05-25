from functools import cache

@cache
def num_after_days(state, days = 256):
    num = 1
    next = state + 1

    if days < next:
        return num

    remaining = days - next
    for i in range(1 + remaining // 7):
        num += num_after_days(8, remaining - 7 * i)

    return num

states = list(map(int, open(0).read().split(',')))
total = sum(map(num_after_days, states))

print(total)
