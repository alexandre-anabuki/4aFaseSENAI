import cv2
import os

os.makedirs("Saida", exist_ok=True)

img = cv2.imread("Imagens/1.jpeg")

if img is None:
    print("Erro: não foi possível abrir a imagem.")
else:
    caminho_saida = "Saida/copia_imagem.jpg"

    cv2.imwrite(caminho_saida, img)
    print(f"Cópia salva com sucesso em: {caminho_saida}")