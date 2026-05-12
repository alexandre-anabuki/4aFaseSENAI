const db = require('../config/db.js')

const criarReserva = async (req, res) =>{
    try{
        const data_horario_entrada = req.body.data_horario_entrada
        const data_horario_saida = req.body.data_horario_saida
        const qtd_hospedes = req.body.qtd_hospedes
        const tipo_pagamento = req.body.tipo_pagamento
        const valor = req.body.valor
        const observacoes = req.body.observacoes
        const cliente_id = req.body.cliente_id
        const quarto_id = req.body.quarto_id

        if(data_horario_entrada === "" || data_horario_saida ==="" || qtd_hospedes === "" || tipo_pagamento === "" || valor == "" || cliente_id == "" || quarto_id == ""){
            return res.status(400).json({message:"Campo não pode estar vazio", success: false})
        }

        const [result] = await db.query("INSERT INTO reserva (data_horario_entrada, data_horario_saida, qtd_hospedes, tipo_pagamento, valor, observacoes, cliente_id, quarto_id) VALUE (?, ?, ?, ?, ?, ?, ?, ?)", [data_horario_entrada, data_horario_saida, qtd_hospedes, tipo_pagamento, valor, observacoes, cliente_id, quarto_id])
        
        if(result.affectedRows === 0){
            return res.status(400).json({message:"Não foi possivel cirar a reserva", success: false})
        }

        return res.status(201).json({message: "reserva criado com sucesso", success: true})
    }
    catch(error){
        return res.status(500).json({message: "Erro ao criar reserva", erro: error.message})
    }
}

const buscarReservas = async (req, res) => {
    try{
        const [result] = await db.query("SELECT data_horario_entrada, data_horario_saida, qtd_hospedes, tipo_pagamento, cliente_id, quarto_id valor FROM reserva")

        if(result.length === 0){
            return res.status(404).json({ message: "Nenhuma reserva encontrado" })
        }
        return res.status(200).json({ message: "reserva encontrados", data: result })
    }
    catch(error){
        return res.status(500).json({ message: "Erro ao buscar reserva", error: error.message })
    }
}

const editarReserva = async (req, res) => {
        const id_reserva = req.params.id_reserva
        const data_horario_entrada = req.body.data_horario_entrada
        const data_horario_saida = req.body.data_horario_saida
        const qtd_hospedes = req.body.qtd_hospedes
        const tipo_pagamento = req.body.tipo_pagamento
        const valor = req.body.valor
        const observacoes = req.body.observacoes
        const cliente_id = req.body.cliente_id
        const quarto_id = req.body.quarto_id

    try{
        const [result] = await db.query("UPDATE reserva SET data_horario_entrada = ?, data_horario_saida = ?, qtd_hospedes = ?, tipo_pagamento =?, valor = ?, observacoes = ?, quarto_id = ?, cliente_id = ? WHERE id_reserva = ?", [data_horario_entrada, data_horario_saida, qtd_hospedes, tipo_pagamento, valor, observacoes, quarto_id, cliente_id, id_reserva])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "reserva não encontrada"})
        }
        return res.status(200).json({ message: "reserva editada com sucesso", data: result })
    }
    catch (error){
        return res.status(500).json({ message: "Erro ao editar reserva", error: error.message })
    }
}

const deletarReserva = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM reserva WHERE id_reserva = ?", [req.params.id_reserva])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "reserva não encontrado"})
        }
        return res.status(200).json({ message: "reserva deletado com sucesso", data: result })
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao deletar reserva", error: error.message })
    }
}

module.exports = {
    criarReserva, buscarReservas, editarReserva, deletarReserva
}