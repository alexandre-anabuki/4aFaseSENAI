const db = require('../config/db.js')
const bcrypt = require('bcrypt')

const criarCliente = async (req, res) =>{
    try{
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        const senha = req.body.senha

        if(nome === "" || email === "" || cpf === "" || telefone === "" || senha === ""){
            return res.status(400).json({message:"Campo não pode estar vazio", success: false})
        }

        const saltRound = 10
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("INSERT INTO cliente (nome, email, cpf, telefone, senha) VALUE (?, ?, ?, ?, ?)", [nome, email, cpf, telefone, hashPassword])
        
        if(result.affectedRows === 0){
            return res.status(400).json({message:"Não foi possivel cirar o cliente", success: false})
        }

        return res.status(201).json({message: "Cliente criado com sucesso", success: true})
    }
    catch(error){
        return res.status(500).json({message: "Erro ao criar cliente", erro: error.message})
    }
}

const buscarClientes = async (req, res) => {
    try{
        const [result] = await db.query("SELECT nome, email, cpf, telefone FROM cliente")

        if(result.length === 0){
            return res.status(404).json({ message: "Nenhum cliente encontrado" })
        }
        return res.status(200).json({ message: "Cliente encontrados", data: result })
    }
    catch(error){
        return res.status(500).json({ message: "Erro ao buscar cliente", error: error.message })
    }
}

const editarCliente = async (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const id_cliente = req.params.id_cliente

    try{
        const [result] = await db.query("UPDATE cliente SET nome = ?, email = ?, cpf = ?, telefone = ? WHERE id_cliente = ?", [nome, email, cpf, telefone, id_cliente])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Cliente não encontrado"})
        }
        return res.status(200).json({ message: "Cliente editado com sucesso", data: result })
    }
    catch (error){
        return res.status(500).json({ message: "Erro ao editar cliente", error: error.message })
    }
}

const deletarCliente = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM cliente WHERE email = ?", [req.params.email])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Cliente não encontrado"})
        }
        return res.status(200).json({ message: "Cliente deletado com sucesso", data: resul })
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao deletar cliente", error: error.message })
    }
}

module.exports = {
    criarCliente, buscarClientes, editarCliente, deletarCliente
}