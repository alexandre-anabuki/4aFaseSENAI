const db = require('../config/db.js')

const criarQuarto = async (req, res) =>{
    try{
        const tipo_quarto = req.body.tipo_quarto
        const numero = req.body.numero
        const capacidade = req.body.capacidade
        const funcionario_id = req.body.funcionario_id

        if(tipo_quarto === "" || numero === "" || capacidade ==="" || funcionario_id == ""){
            return res.status(400).json({message:"Campo não pode estar vazio", success: false})
        }

        const [result] = await db.query("INSERT INTO quarto (tipo_quarto, numero, capacidade, funcionario_id) VALUE (?, ?, ?, ?)", [tipo_quarto, numero, capacidade, funcionario_id])
        
        if(result.affectedRows === 0){
            return res.status(400).json({message:"Não foi possivel cirar a quarto", success: false})
        }

        return res.status(201).json({message: "quarto criado com sucesso", success: true})
    }
    catch(error){
        return res.status(500).json({message: "Erro ao criar quarto", erro: error.message})
    }
}

const buscarQuartos = async (req, res) => {
    try{
        const [result] = await db.query("SELECT tipo_quarto, numero, capacidade FROM quarto")

        if(result.length === 0){
            return res.status(404).json({ message: "Nenhuma quarto encontrado" })
        }
        return res.status(200).json({ message: "quarto encontrados", data: result })
    }
    catch(error){
        return res.status(500).json({ message: "Erro ao buscar quarto", error: error.message })
    }
}

const editarQuarto = async (req, res) => {
        const tipo_quarto = req.body.tipo_quarto
        const numero = req.params.numero
        const capacidade = req.body.capacidade
        const funcionario_id = req.body.funcionario_id

    try{
        const [result] = await db.query("UPDATE quarto SET tipo_quarto = ?, funcionario_id = ?, capacidade = ? WHERE numero = ?", [tipo_quarto, funcionario_id, capacidade,  numero])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "quarto não encontrada"})
        }
        return res.status(200).json({ message: "quarto editada com sucesso", data: result })
    }
    catch (error){
        return res.status(500).json({ message: "Erro ao editar quarto", error: error.message })
    }
}

const deletarQuarto = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM quarto WHERE numero = ?", [req.params.numero])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "quarto não encontrado"})
        }
        return res.status(200).json({ message: "quarto deletado com sucesso", data: result })
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao deletar quarto", error: error.message })
    }
}

module.exports = {
    criarQuarto, buscarQuartos, editarQuarto, deletarQuarto
}