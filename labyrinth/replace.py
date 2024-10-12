#Sostituisce gli spazi vuoti con # sperando di vedere qualcosa

with open("./labyrinth.txt", "r") as file:
    contenuto = file.read()

contenuto_modificato = contenuto.replace(" ", "#")

with open("./replaced.txt", "w") as file:
    file.write(contenuto_modificato)
