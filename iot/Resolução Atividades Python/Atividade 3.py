import cv2
import os

os.makedirs("Saida", exist_ok=True)

img = cv2.imread("Imagens/1.jpeg")

if img is None:
    print("Erro: não foi possível abrir a imagem.")
else:
    # Recorte 1
    x1 = 50
    y1 = 50
    w1 = 150
    h1 = 150
    recorte1 = img[y1:y1+h1, x1:x1+w1]

    # Recorte 2
    x2 = 250
    y2 = 100
    w2 = 200
    h2 = 120
    recorte2 = img[y2:y2+h2, x2:x2+w2]

    cv2.imshow("Imagem original", img)
    cv2.imshow("Recorte 1", recorte1)
    cv2.imshow("Recorte 2", recorte2)

    cv2.imwrite("saida/recorte1.jpg", recorte1)
    cv2.imwrite("saida/recorte2.jpg", recorte2)

    print("Os dois recortes foram salvos com sucesso.")

    cv2.waitKey(0)
    cv2.destroyAllWindows()