from flask import Flask, render_template, Response, jsonify, request, redirect, url_for, session
import cv2
import mediapipe as mp
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'chave_super_secreta_do_joinha' 

# Configuração para salvar os prints
PASTA_PRINTS = os.path.join('static', 'prints')
if not os.path.exists(PASTA_PRINTS):
    os.makedirs(PASTA_PRINTS)

gesto_atual = "nenhum"
estado_maquina = "Desligada" 
ultimo_estado_registrado = "Desligada" 

mp_maos = mp.solutions.hands
mp_desenho = mp.solutions.drawing_utils

maos = mp_maos.Hands(
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

def eh_joinha(landmarks):
    polegar_para_cima = landmarks[4].y < landmarks[3].y and landmarks[3].y < landmarks[2].y
    indicador_dobrado = landmarks[8].y > landmarks[6].y
    medio_dobrado = landmarks[12].y > landmarks[10].y
    anelar_dobrado = landmarks[16].y > landmarks[14].y
    mindinho_dobrado = landmarks[20].y > landmarks[18].y
    
    outros_dedos_dobrados = indicador_dobrado and medio_dobrado and anelar_dobrado and mindinho_dobrado
    return polegar_para_cima and outros_dedos_dobrados

def eh_hangloose(landmarks):
    polegar_para_cima = landmarks[4].y < landmarks[3].y and landmarks[3].y < landmarks[2].y
    mindinho_para_cima = landmarks[20].y < landmarks[18].y and landmarks[18].y < landmarks[16].y
    indicador_dobrado = landmarks[8].y > landmarks[6].y
    medio_dobrado = landmarks[12].y > landmarks[10].y
    anelar_dobrado = landmarks[16].y > landmarks[14].y
    
    outros_dedos_dobrados = indicador_dobrado and medio_dobrado and anelar_dobrado 
    return polegar_para_cima and mindinho_para_cima and outros_dedos_dobrados

# --- Alteração: Agora a função recebe o 'usuario' como parâmetro ---
def salvar_print(frame, acao, usuario):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    nome_arquivo = f"{acao}_{usuario}_{timestamp}.jpg"
    caminho_completo = os.path.join(PASTA_PRINTS, nome_arquivo)
    
    try:
        cv2.imwrite(caminho_completo, frame)
        print(f"Print salvo com sucesso: {caminho_completo}")
    except Exception as e:
        print(f"Erro ao salvar print no disco: {e}")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nome = request.form.get('nome')
        if nome:
            session['usuario'] = nome
            return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect(url_for('login'))

@app.route('/')
def home():
    if 'usuario' not in session:
        return redirect(url_for('login'))
    return render_template('index.html', usuario=session['usuario'])

# --- Alteração: A função agora recebe 'usuario_atual' ---
def gerar_frames(usuario_atual):
    global gesto_atual
    global estado_maquina
    global ultimo_estado_registrado
    
    camera = cv2.VideoCapture(0)
    if not camera.isOpened():
        print("Erro: não foi possivel abrir a camera.")
        return
    
    try:
        while True:
            sucesso, frame = camera.read()
            if not sucesso:
                break
            
            frame = cv2.flip(frame, 1)
            frame_para_print = frame.copy()
            
            imagem_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            resultado = maos.process(imagem_rgb)
            
            gesto_atual = "nenhum"
            
            if resultado.multi_hand_landmarks:
                for mao in resultado.multi_hand_landmarks:
                    mp_desenho.draw_landmarks(frame, mao, mp_maos.HAND_CONNECTIONS)
                    
                    if eh_joinha(mao.landmark):
                        gesto_atual = "joinha"
                        estado_maquina = "Ligada"
                        cv2.putText(frame, "JOINHA: LIGAR", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
                        
                    elif eh_hangloose(mao.landmark):
                        gesto_atual = "HangLoose"
                        estado_maquina = "Desligada"
                        cv2.putText(frame, "HANGLOOSE: DESLIGAR", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

            # --- Alteração: Bloco try/except para impedir que a câmera trave ---
            try:
                if estado_maquina != ultimo_estado_registrado:
                    acao = "iniciada" if estado_maquina == "Ligada" else "parada"
                    salvar_print(frame_para_print, acao, usuario_atual)
                    ultimo_estado_registrado = estado_maquina
            except Exception as e:
                print(f"Falha interna ao processar o print: {e}")
                        
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                continue
            
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
    finally:
        camera.release()
        
@app.route('/video_feed')
def video_feed():
    # --- Alteração: Pegamos o nome do usuário ANTES de abrir o gerador de vídeo ---
    usuario_atual = session.get('usuario', 'Desconhecido')
    return Response(gerar_frames(usuario_atual), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/gesture_status')
def gesture_status():
    return jsonify({
        "gesto": gesto_atual,
        "estado_maquina": estado_maquina,
        "usuario": session.get('usuario', 'Desconhecido')
    })
    
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)