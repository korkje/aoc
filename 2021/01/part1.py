nums = [int(n) for n in open(0)]
print(sum(a < b for a, b in zip(nums, nums[1:])))
