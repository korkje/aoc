cols = zip(*[line.strip().split() for line in open(0)])
print(sum(eval(o.join(ns)) for *ns, o in cols))
