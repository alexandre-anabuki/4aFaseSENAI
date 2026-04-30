import cv2

img1 = cv2.imread("Imagens/1.jpeg")
img2 = cv2.imread("Imagens/2.jpeg")

if img1 is None or img2 is None:
    print("Erro: uma ou mais imagens não puderam ser abertas.")
else:
    cv2.imshow("Imagem 1", img1)
    cv2.imshow("Imagem 2", img2)

    cv2.waitKey(0)
    cv2.destroyAllWindows()