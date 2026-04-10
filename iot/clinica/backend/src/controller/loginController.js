const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const login = async (req, res) => {
    try {
        const {cpf, senha} = req.body;

        if (!cpf || !senha) {  
            return res.status(400).json({ message: "cpf e senha são obrigatórios.", success: false });  
        }

        const [rows] = await db.query(  
            "SELECT id_usuario, nome, cpf, password_hash, FROM usuario WHERE cpf = ? LIMIT 1",  
            [cpf]  
        );  
    
        if (rows.length === 0) {  
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });  
        }  
    
        const user = rows[0];  // usuário encontrado, agora verificar a senha
    
        const ok = await bcrypt.compare(senha, user.password_hash);  // compara a senha fornecida com o hash armazenado no banco de dados
        if (!ok) {  
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });  
        }  
    
        // JWT: "crachá" do usuário  
        const token = jwt.sign(  
            { 
                sub: user.id, 
                //tipo_usuario: user.tipo_usuario 
            }, // payload (não coloque senha aqui)  
            process.env.JWT_SECRET,
            { 
                expiresIn: "1h" 
            }
        );  
    
        return res.status(200).json({  
            message: "Login realizado com sucesso.",
            success: true,
            token: token,
            user: {
                id: user.id,
                nome: user.nome,
                cpf: user.cpf
            }  
        });

    } catch (error) {
        res.status(500).json({message: 'Erro ao realizar login.', error: error.message, success: false});
    }
}

//Função esqueci minha senha
const esqueciSenha = async (req, res) => {
    try {
        const cpf = req.body.cpf;
        const senha = req.body.senha_nova;
        const confirmar_senha = req.body.confirmar_senha;

        if (cpf === "")
            return res.status(400).json({ message: "Email não deve estar vazio. Ele é obrigatório.", success: false });

        if (senha === "") {
            return res.status(400).json({ message: "A nova senha não deve estar vazio. Ela é obrigatória.", success: false });
        } else {
            if (senha.length < 6 || senha.length > 12)
                return res.status(400).json({ message: "A senha deve ter somente de 6 a 12 caracteres.", success: false });

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
            if (!passwordRegex.test(senha)) { //se a senha NÃO conter pelo menos uma letra maiuscula, uma letra minuscula, um caracter e um numero
                return res.status(400).json({ message: "A senha não corresponde as regras impostas para uma senha forte.", success: false })
            }
        }

        if (confirmar_senha === "") {
            return res.status(400).json({ message: "O campo confirmar senha é obrigatório. Não deve estar vazio.", success: false });
        } else {
            if (confirmar_senha !== senha)
                return res.status(400).json({ message: "O campo confirmar senha não é igual a senha. Tente novamente!", success: false });
        }

        //seleciona o id por cpf
        const [row] = await db.query("SELECT id FROM usuario WHERE cpf = ?", [cpf]);
        if (row.length === 0)
            return res.status(400).json({ message: "Esse usuário não foi encontrado.", success: false })

        const user = row[0]; //dado do usuario que veio da consulta

        //Criar nova senha
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound); //senha convertida para hash - criptografa a senha

        const [result] = await db.query("UPDATE usuario SET senha = ? WHERE id = ?", [hashPassword, user.id]);
        if(result.affectedRows === 0)
            return res.status(400).json({ message: "Não foi possível resetar a sua senha. Tente novamente!", success: false });

        return res.status(201).json({ message: "Senha atualizada com sucesso.", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar senha.", erro: error.message });
    }
}

module.exports = {
    login, esqueciSenha
}