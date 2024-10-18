# Risolve il labirinto ( dopo essermi accorto che la strada è guidata e ne esite una sola )
# Quando incontra un : passa alla linea successiva ricordando la posizione orizzontale,
# continua ad oltranza fino a trovare il secondo -
def readFile():
    with open("./labyrinth.txt", "r") as file:
        lines = file.readlines()
    return lines


class Results:

    def __init__(self, lines) -> None:

        self.file = open("./result.txt", "w+")
        # Copio il labirinto
        for line in lines:
            self.file.write(line)

        self.line_len = len(lines[0]) 
        self.file.seek(0)

    # Non conta la prima riga
    current_line = -1
    def highlight(self, char, new_line = False):

        if(new_line):
            self.current_line += 1
        # Calcolo la posizione per il nuovo carattere ed imposto il puntatore
        self.file.seek(
            self.line_len * self.current_line  + char + 1 * self.current_line
        ) 

        self.file.write("#")

    def end(self, current_line, horizontal_position, binaryString):
        self.file.close()
        print(f"Avanti: {horizontal_position}")
        print(f"Destra: {current_line}")
        ascii_string = "".join(
            [
                chr(int(binaryString[i : i + 8], 2))
                for i in range(0, len(binaryString), 8)
            ]
        )
        print(ascii_string)
        print(binaryString)
        exit(0)


def findWay(lines, results):

    binaryString = ""
    partenza = False
    horizontal_position = 0

    for current_line, line in enumerate(lines):

        results.highlight(horizontal_position, new_line=True)

        while line[horizontal_position + 1] != ":":

            if line[horizontal_position + 1] == "-" and partenza:
                print("Arrivo")
                results.end(current_line, horizontal_position, binaryString)
            elif not partenza:
                print("Inizio")
                horizontal_position += 1
                partenza = True

            # right
            if partenza:
                binaryString += "1"

            horizontal_position += 1
            results.highlight(horizontal_position)

        # down
        if partenza:
            binaryString+= "0"

def main():
    lines = readFile()
    results = Results(lines)
    findWay(lines, results)


main()
