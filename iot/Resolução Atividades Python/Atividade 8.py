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

        altura, largura = frame.shape[:2]

        w = 200
        h = 200
        x = (largura - w) // 2
        y = (altura - h) // 2

        # Desenha um retângulo mostrando a área do recorte
        frame_com_guia = frame.copy()
        cv2.rectangle(frame_com_guia, (x, y), (x + w, y + h), (0, 255, 0), 2)

        cv2.imshow("Pressione S para capturar e recortar | Q para sair", frame_com_guia)

        tecla = cv2.waitKey(1) & 0xFF

        if tecla == ord('s'):
            recorte = frame[y:y+h, x:x+w]

            cv2.imshow("Recorte central", recorte)
            cv2.imwrite("Saida/recorte_webcam.jpg", recorte)

            print("Recorte salvo com sucesso em: Saida/recorte_webcam.jpg")

        elif tecla == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()