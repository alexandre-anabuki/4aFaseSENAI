const db = require('../config/db.js')

const criarAgenda = async (req, res) =>{
    try{
        const tipo = req.body.tipo
        const data_horario = req.body.data_horario
        const bairro = req.body.bairro
        const rua = req.body.rua
        const cep = req.body.cep
        const numero = req.body.numero
        const observacao = req.body.observacao
        const cliente_id = req.body.cliente_id
        const profissional_id = req.body.profissional_id

        if(tipo === "" || data_horario === "" || bairro === "" || rua === "" || cep === "" || numero == "" || cliente_id == "" || profissional_id == ""){
            return res.status(400).json({message:"Campo não pode estar vazio", success: false})
        }

        const [result] = await db.query("INSERT INTO agendamento (tipo, data_horario, bairro, rua, cep, numero, observacao, cliente_id, profissional_id) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)", [tipo, data_horario, bairro, rua, cep, numero, observacao, cliente_id, profissional_id])
        
        if(result.affectedRows === 0){
            return res.status(400).json({message:"Não foi possivel cirar a agenda", success: false})
        }

        return res.status(201).json({message: "Agenda criado com sucesso", success: true})
    }
    catch(error){
        return res.status(500).json({message: "Erro ao criar agenda", erro: error.message})
    }
}

const buscarAgendas = async (req, res) => {
    try{
        const [result] = await db.query("SELECT tipo, bairro, rua, cep, numero FROM agendamento")

        if(result.length === 0){
            return res.status(404).json({ message: "Nenhuma agenda encontrado" })
        }
        return res.status(200).json({ message: "Agenda encontrados", data: result })
    }
    catch(error){
        return res.status(500).json({ message: "Erro ao buscar agenda", error: error.message })
    }
}

const editarAgenda = async (req, res) => {
        const tipo = req.body.tipo
        const data_horario = req.body.data_horario
        const bairro = req.body.bairro
        const rua = req.body.rua
        const cep = req.body.cep
        const numero = req.body.numero
        const observacao = req.body.observacao
        const cliente_id = req.body.cliente_id
        const profissional_id = req.body.profissional_id

    try{
        const [result] = await db.query("UPDATE agendamento SET tipo = ?, data_horario = ?, bairro = ?, rua = ?, cep =?, numero = ?, observacao = ?, profissional = ? WHERE id_cliente = ?", [tipo, data_horario, bairro, rua, cep, numero, observacao, profissional_id, cliente_id])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Agenda não encontrada"})
        }
        return res.status(200).json({ message: "Agenda editada com sucesso", data: result })
    }
    catch (error){
        return res.status(500).json({ message: "Erro ao editar agenda", error: error.message })
    }
}

const deletarAgenda = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM agendamento WHERE cliente_id = ?", [req.params.cliente_id])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Agenda não encontrado"})
        }
        return res.status(200).json({ message: "Agenda deletado com sucesso", data: result })
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao deletar agenda", error: error.message })
    }
}

module.exports = {
    criarAgenda, buscarAgendas, editarAgenda, deletarAgenda
}