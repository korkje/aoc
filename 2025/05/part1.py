top, bottom = open(0).read().split("\n\n")
spans = [tuple(map(int, span.split("-"))) for span in top.split("\n")]
ids = [int(id) for id in bottom.split("\n")]

print(sum(any(lo <= id <= hi for lo, hi in spans) for id in ids))
