# LEGGE IL FILE COME 0 ED 1
oneAs = ":"
zeroAs = " "


def horizontal_read(lines):
    string = "".join(lines)

    # Remove all characters except spaces and colons
    string = "".join([char for char in string if char in [" ", ":"]])

    return binary_conversion(string)


def vertical_read(lines):
    # Transpose the content to read it vertically
    transposed_content = ["".join(row) for row in zip(*lines)]

    # Join the transposed content back into a single string
    transposed_content = "".join(transposed_content)

    filtered_content = "".join(
        [char for char in transposed_content if char in [" ", ":"]]
    )
    return binary_conversion(filtered_content)


def binary_conversion(string):
    binary_content = string.replace(" ", "0").replace(":", "1")

    bytes_list = [binary_content[i : i + 8] for i in range(0, len(binary_content), 8)]

    # Converti la lista di byte in una sequenza di byte
    byte_array = bytearray([int(byte, 2) for byte in bytes_list if len(byte) == 8])

    unicode = ""
    numbers = []
    for byte in bytes_list:
        number = int(byte, 2)
        if len(byte) == 8:
            unicode += chr(number)
            numbers.append(number)

    return unicode, numbers


def read_file(file_path):
    with open(file_path, "r") as file:
        # Skip the first line
        file.readline()

        # Read the remaining content
        content = file.readlines()
        startCharsToSkip = 0
        endCharsToSkip = 0
        while True:
            try:
                startCharsToSkip = int(input("Inserisci il numero di caratteri da saltare ad inizio riga: "))
                endCharsToSkip = int(input("Inserisci il numero di caratteri da saltare a fine riga: "))
                if endCharsToSkip < 0:
                    raise ValueError("Il numero di caratteri da saltare non può essere negativo.")
                break
            except ValueError as e:
                print(f"Input non valido: {e}. Inserisci un numero intero non negativo.")

        content = [line[startCharsToSkip:-endCharsToSkip] for line in content]

    return content[:-4]

def write_message(unicode, numbers, title):
    print("Scrivo i risultati in decoded.txt")
    with open("./decoded.txt", "a", encoding="utf-8") as file :
        file.write(title)
        file.write(
            f"\n\n UNICODE: \n\n {unicode} \n\n NUMBERS: \n\n {numbers}"
        )


with open("decoded.txt", "w") as file:
    print("Svuoto decoded.txt...")

print("Carico il labirinto")
file_path = "./labyrinth.txt"
lines = read_file(file_path)

print("Leggo in orizzontale convertendo in 0 e 1")
unicode, numbers= horizontal_read(lines)
write_message(unicode, numbers, "\n\n\n\n #### HORIZONTAL READ #### \n\n\n\n")

print("Leggo in verticale convertendo in 0 e 1")
unicode, numbers = vertical_read(lines)
write_message(unicode, numbers, "\n\n\n\n #### VERTICAL READ #### \n\n\n\n")
