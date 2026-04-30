import cv2
import os

os.makedirs("Saida", exist_ok=True)

img = cv2.imread("Imagens/1.jpeg")

if img is None:
    print("Erro: não foi possível abrir a imagem.")
else:
    x = 120
    y = 80
    w = 180
    h = 120

    recorte = img[y:y+h, x:x+w]

    cv2.imshow("Imagem original", img)
    cv2.imshow("Recorte", recorte)

    cv2.imwrite("Saida/pinkman.jpg", recorte)
    print("Detalhe salvo com sucesso em: Saida/pinkman.jpg")

    cv2.waitKey(0)
    cv2.destroyAllWindows()