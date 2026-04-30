import cv2
import os

os.makedirs("saida", exist_ok=True)

camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Erro: não foi possível abrir a webcam")
else:
    while True:
        ret, frame = camera.read()

        if not ret:
            print("Erro: não foi possível capturar o frame")
            break


        frame_com_guia = frame.copy()

        cv2.imshow("Presione S para capturar e recortar ou presione Q para sair", frame_com_guia)

        tecla = cv2.waitKey(1) & 0xFF

        if tecla == ord('s'):
            edt = cv2.selectROI("selecione a area de recorte", frame_com_guia, False)
            print(edt)

            v1 = int(edt[0])
            v2 = int(edt[1])
            v3 = int(edt[2])
            v4 = int(edt[3])
            recorte = frame[v2:v2+v4,v1:v1+v3]

            cv2.imshow("Recorte central", recorte)
            cv2.imwrite("saida/recorte_webcam.jpg", recorte)

            print("Recorte salvo com sucesso em: saida/recorte_webcam.jpg")
        
        elif tecla == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()