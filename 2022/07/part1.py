lines = open(0).read().split('\n')
length = len(lines)

dirs = {''}
files = {}
cwd = ''
i = 0

while i < length:
    line = lines[i]
    if line.startswith('$'):
        cmd = line[2:4]
        if cmd == 'cd':
            arg = line[5:]
            if arg == '..':
                cwd = '/'.join(cwd.split('/')[:-1])
            elif arg == '/':
                cwd = ''
            else:
                cwd += '/' + arg
        elif cmd == 'ls':
            j = i + 1
            while j < length and not lines[j].startswith('$'):
                if lines[j].startswith('dir'):
                    dirs.add(cwd + '/' + lines[j][4:])
                else:
                    size, name = lines[j].split(' ')
                    files[cwd + '/' + name] = int(size)

                j += 1
            i = j - 1
    i += 1

under100k = []

for dir in dirs:
    size = 0
    for file in files:
        if file.startswith(dir):
            size += files[file]
    if size < 100_000:
        under100k.append(size)

print(sum(under100k))
