import cv2

video = cv2.VideoCapture("Imagens/video.mp4")

if not video.isOpened():
    print("Erro: não foi possível abrir o vídeo.")
else:
    while True:
        ret, frame = video.read()

        if not ret:
            print("O vídeo terminou.")
            break

        cv2.imshow("Meu primeiro video com OpenCV", frame)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            print("Vídeo encerrado pelo usuário.")
            break

    video.release()
    cv2.destroyAllWindows()