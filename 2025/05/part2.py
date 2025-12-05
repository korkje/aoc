top, _ = open(0).read().split("\n\n")
spans = [tuple(map(int, span.split("-"))) for span in top.split("\n")]
spans.sort()

merged = spans[:1]
for lo, hi in spans[1:]:
    last_lo, last_hi = merged[-1]
    if lo <= last_hi:
        merged[-1] = (last_lo, max(last_hi, hi))
    else:
        merged.append((lo, hi))

print(sum(hi - lo + 1 for lo, hi in merged))
