nums = [int(n) for n in open(0)]
sums = [sum(nums[i:i + 3]) for i in range(len(nums) - 2)]
print(sum(a < b for a, b in zip(sums, sums[1:])))
