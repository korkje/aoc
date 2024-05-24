num_to_tiles = {}

def add_tile(num, tile):
    if num not in num_to_tiles:
        num_to_tiles[num] = []

    num_to_tiles[num].append(tile)

class Board:
    def __init__(self, board_str):
        self.rows = [RowOrCol() for _ in range(5)]
        self.cols = [RowOrCol() for _ in range(5)]
        self.tiles = set()

        for y, row_str in enumerate(board_str.split('\n')):
            for x, num in enumerate(row_str.split()):
                tile = Tile(self, self.rows[y], self.cols[x], num)
                self.tiles.add(tile)

class RowOrCol:
    def __init__(self):
        self.items = 5

class Tile:
    def __init__(self, board, row, col, num):
        self.board = board
        self.row = row
        self.col = col
        self.num = num
        add_tile(num, self)

    def remove(self):
        self.row.items -= 1
        self.col.items -= 1
        self.board.tiles.remove(self)

        if (self.row.items == 0 or self.col.items == 0):
            return self.board

numbers_str, *board_strs = open(0).read().split('\n\n')
numbers = numbers_str.split(',')
boards = {Board(board_str) for board_str in board_strs}

for num in numbers:
    tiles = num_to_tiles.pop(num)
    for tile in tiles:
        if board := tile.remove():
            print(sum(int(tile.num) for tile in board.tiles) * int(num))
            exit()
