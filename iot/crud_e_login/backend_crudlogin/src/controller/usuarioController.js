const db = require('../config/db.js')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try{

        const nome = req.body.nome
        const email = req.body.email
        const senha = req.body.senha
        const tipo = req.body.tipo

        if(nome === ""){
            return res.status(400).json({message: "Nome não deve estar vazio", success: false})
        }
        const saltRound = 10
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [nome, email, hashPassword, tipo])

        if(result.affectedRows === 0){
            return res.status(400).json({message: "Não foi possível inserir usuário", success: false})
        }

        return res.status(201).json({message: "Usuário criado com sucesso", success: true})

    } catch (error) {
        return res.status(500).json({message: "Erro ao criar ususário", erro: error.message})
    }
}

module.exports = {
    createUser
}