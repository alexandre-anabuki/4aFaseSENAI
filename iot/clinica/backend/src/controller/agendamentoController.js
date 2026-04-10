const db = require('../config/db.js');
const bcrypt = require('bcrypt');

const criarAgenda = async (req, res) => {

    try {
        const {data_marcada, horario, tipo_usuario, usuario_id} = req.body;

        if(data_marcada === ""){
            return res.status(400).json({message: 'O requisito não pode estar vazio.'});
        }

        if(horario === ""){
            return res.status(400).json({message: 'O requisito não pode estar vazio.'});
        }

        if(tipo_usuario != "Médico" || tipo_usuario != "Analista Administrativo" || tipo_usuario === ""){
            return res.status(400).json({message: 'O usuario deve ser um Médico ou Analista Administrativo e não pode estar vazio.'});
        }

        if(data_marcada === ""){
            return res.status(400).json({message: 'O requisito não pode estar vazio.'});
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(senha, saltRounds);

        const [result] = await db.query("INSERT INTO agendamento (data_marcada, horario, tipo_usuario, usuario_id) VALUES (?, ?, ?, ?)", [data_marcada, horario, tipo_usuario, usuario_id]);

        if(result.affectedRows === 0){
            return res.status(400).json({message: 'Não foi possível criar o agendamento.'});
        }

        return res.status(201).json({message: 'Agendamento criado com sucesso.'});

    } catch (error) {
        return res.status(500).json({message: 'Erro ao criar agendamento.', error: error.message});
    }

};

const getAgenda = async (req, res) => {
    try {
        const [resultado] = await db.query("SELECT id, nome, cpf FROM agendamento where ativo = 1");

        if(resultado.length === 0) {
            return res.status(404).json({ message: "Nenhuma agenda encontrado" });
        }
        return res.status(200).json({ message: "Agenda encontrada", data: resultado });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar agenda", error: error.message });
    }
}

const editAgenda = async (req, res) => {
    try {
        const [resultado] = await db.query("UPDATE agendamento SET nome = ?, cpf = ? WHERE id_agendamento = ?", [req.body.nome, req.body.cpf, req.params.id_agendamento]);

        if (resultado.affectedRows === 0) {  
            return res.status(404).json({ message: "Agenda não encontrada" });  
        }
        return res.status(200).json({ message: "Agenda editada com sucesso", data: resultado });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao editar agenda", error: error.message });
    }
}

const deleteAgenda = async (req, res) => {
    try {
        const [resultado] = await db.query("DELETE FROM agendamento WHERE id_agendamento = ?", [req.params.id_agendamento]);

        if (resultado.affectedRows === 0) {  
            return res.status(404).json({ message: "Agenda não encontrada" });  
        }
        return res.status(200).json({ message: "Agenda deletada com sucesso", data: resultado });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar Agenda", error: error.message });
    }
}

module.exports = {
    criarAgenda,
    getAgenda,
    editAgenda,
    deleteAgenda
};