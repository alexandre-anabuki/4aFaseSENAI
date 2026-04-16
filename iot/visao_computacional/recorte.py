import cv2

img = cv2.imread('2.jpg')
imgCinza = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
edt = cv2.selectROI("selecione a area de recorte", img, False)
cv2.destroyWindow('selecione a area de recorte')
print(edt)

v1 = int(edt[0])
v2 = int(edt[1])
v3 = int(edt[2])
v4 = int(edt[3])



#recorte = img[0:350, 300:800]
recorte = img[v2:v2+v4,v1:v1+v3]
caminho = 'img/'
nome_arquivo = input('Digite o nome do arquivo')

cv2.imwrite(f'{caminho}{nome_arquivo}.jpg', recorte)
print("imagen salva com sucesso")

#cv2.imwrite(caminho, recorte)

cv2.imshow('img', recorte)
cv2.waitKey(0)