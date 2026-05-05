const db = require('../config/db.js')
const bcrypt = require('bcrypt')

const criarFuncionario = async (req, res) =>{
    try{
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        const turno = req.body.turno
        const senha = req.body.senha

        if(nome === "" || email === "" || cpf === "" || telefone === "" || senha === "" || turno === ""){
            return res.status(400).json({message:"Campo não pode estar vazio", success: false})
        }

        const saltRound = 10
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("INSERT INTO funcionario (nome, email, cpf, telefone, turno, senha) VALUE (?, ?, ?, ?, ?, ?)", [nome, email, cpf, telefone, turno, hashPassword])
        
        if(result.affectedRows === 0){
            return res.status(400).json({message:"Não foi possivel cirar o funcionario", success: false})
        }

        return res.status(201).json({message: "funcionario criado com sucesso", success: true})
    }
    catch(error){
        return res.status(500).json({message: "Erro ao criar funcionario", erro: error.message})
    }
}

const buscarFuncionarios = async (req, res) => {
    try{
        const [result] = await db.query("SELECT nome, email, cpf, telefone FROM funcionario")

        if(result.length === 0){
            return res.status(404).json({ message: "Nenhum funcionario encontrado" })
        }
        return res.status(200).json({ message: "funcionario encontrados", data: result })
    }
    catch(error){
        return res.status(500).json({ message: "Erro ao buscar funcionario", error: error.message })
    }
}

const editarFuncionario = async (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const turno = req.body.turno
    const id_funcionario = req.params.id_funcionario

    try{
        const [result] = await db.query("UPDATE funcionario SET nome = ?, email = ?, cpf = ?, telefone = ?, turno = ? WHERE id_funcionario = ?", [nome, email, cpf, telefone, turno, id_funcionario])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "funcionario não encontrado"})
        }
        return res.status(200).json({ message: "funcionario editado com sucesso", data: result })
    }
    catch (error){
        return res.status(500).json({ message: "Erro ao editar funcionario", error: error.message })
    }
}

const deletarFuncionario = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM funcionario WHERE email = ?", [req.params.email])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "funcionario não encontrado"})
        }
        return res.status(200).json({ message: "funcionario deletado com sucesso", data: result })
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao deletar funcionario", error: error.message })
    }
}

module.exports = {
    criarFuncionario, buscarFuncionarios, editarFuncionario, deletarFuncionario
}