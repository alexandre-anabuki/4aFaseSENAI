import cv2
import os

os.makedirs("Saida", exist_ok=True)

camera = cv2.VideoCapture(0)
contador = 1

if not camera.isOpened():
    print("Erro: não foi possível abrir a webcam.")
else:
    while True:
        ret, frame = camera.read()

        if not ret:
            print("Erro: não foi possível capturar o frame.")
            break

        cv2.imshow("Pressione S para tirar foto ou Q para sair", frame)

        tecla = cv2.waitKey(1) & 0xFF

        if tecla == ord('s'):
            nome_arquivo = f"Saida/foto_{contador}.jpg"
            cv2.imwrite(nome_arquivo, frame)
            print(f"Foto salva com sucesso em: {nome_arquivo}")
            contador += 1

        elif tecla == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()