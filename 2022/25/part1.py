def parse(file):
    return sum([parse_line(line.strip()) for line in file])

def parse_line(line):
    length = len(line)
    return sum([parse_char(line[i]) * pow(5, length - i - 1) for i in range(length)])

def parse_char(char):
    return "=-012".index(char) - 2

def reverse(number):
    output = ""
    while number:
        remainder = number % 5
        number //= 5

        if remainder <= 2:
            output = str(remainder) + output
        else:
            output = "=-"[remainder - 3] + output
            number += 1

    return output

print(reverse(parse(open(0))))
