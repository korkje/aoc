def median(nums):
    nums = sorted(nums)
    m = len(nums) // 2

    if len(nums) % 2 == 0:
        return (nums[m - 1] + nums[m]) / 2
    else:
        return nums[m]

positions = list(map(int, open(0).read().split(',')))
target = round(median(positions))

print(sum(map(lambda x: abs(x - target), positions)))
