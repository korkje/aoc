class Node:
    def __init__(self, value):
        self.value = int(value)
        self.left = None
        self.right = None

nodes = list(map(Node, open(0)))
length = len(nodes)

for i in range(len(nodes)):
    nodes[i].left = nodes[(i - 1) % len(nodes)]
    nodes[i].right = nodes[(i + 1) % len(nodes)]

for node in nodes:
    if node.value == 0:
        zero = node
        continue

    l1, r1 = node.left, node.right
    current = node

    if node.value > 0:
        for i in range(node.value % (length - 1)):
            current = current.right
        l2, r2 = current, current.right
    else:
        for i in range(-node.value % (length - 1)):
            current = current.left
        l2, r2 = current.left, current

    l1.right = r1
    r1.left = l1
    l2.right = node
    r2.left = node
    node.left = l2
    node.right = r2

result = 0
current = zero

for i in range(3):
    for i in range(1000 % length):
        current = current.right
    result += current.value

print(result)
