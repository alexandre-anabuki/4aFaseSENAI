CREATE TABLE usuario(
id_usuario INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(50),
PRIMARY KEY (id_usuario)
);

CREATE TABLE veiculo(
id_veiculo INT NOT NULL AUTO_INCREMENT,
placa VARCHAR(50),
marca VARCHAR(50),
modelo VARCHAR(50),
bateria_status VARCHAR(50),
quilometragem INT,
retirada DATETIME,
bateria_retirada VARCHAR(50),
retorno DATETIME,
bateria_retorno VARCHAR(50),
usuario_id INT,
FOREIGN KEY (usuario_id)
REFERENCES usuario (id_usuario),
PRIMARY KEY (id_veiculo)
);