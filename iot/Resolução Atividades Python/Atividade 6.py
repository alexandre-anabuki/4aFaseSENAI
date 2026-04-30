import cv2
import os

os.makedirs("Saida", exist_ok=True)

camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Erro: não foi possível abrir a webcam.")
else:
    while True:
        ret, frame = camera.read()

        if not ret:
            print("Erro: não foi possível capturar o frame.")
            break

        cv2.imshow("Webcam ao vivo", frame)

        tecla = cv2.waitKey(1) & 0xFF

        if tecla == ord('s'):
            cv2.imwrite("Saida/frame_salvo.jpg", frame)
            print("Frame salvo com sucesso.")

        elif tecla == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()