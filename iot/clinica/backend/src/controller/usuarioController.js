const db = require('../config/db.js');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {

    try {
        const {nome, cpf, senha} = req.body;

        if(cpf.length != 11 || cpf === ""){
            return res.status(400).json({message: 'O cpf deve ter 11 caracteres e não pode estar vazio.'});
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(senha, saltRounds);

        const [result] = await db.query("INSERT INTO usuario (nome, cpf, password_hash, ativo) VALUES (?, ?, ?, ?)", [nome, cpf, hashPassword, 1]);

        if(result.affectedRows === 0){
            return res.status(400).json({message: 'Não foi possível criar o usuário.'});
        }

        return res.status(201).json({message: 'Usuário criado com sucesso.'});

    } catch (error) {
        return res.status(500).json({message: 'Erro ao criar usuário.', error: error.message});
    }

};

const getUsers = async (req, res) => {
    try {
		const [resultado] = await db.query("SELECT id, nome, cpf FROM usuario where ativo = 1");

		if(resultado.length === 0) {
			return res.status(404).json({ message: "Nenhum usuário encontrado" });
		}
		return res.status(200).json({ message: "Usuários encontrados", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
	}
}

const editUser = async (req, res) => {
	try {
		const [resultado] = await db.query("UPDATE usuario SET nome = ?, cpf = ? WHERE id_usuario = ?", [req.body.nome, req.body.cpf, req.params.id_usuario]);

		if (resultado.affectedRows === 0) {  
			return res.status(404).json({ message: "Usuário não encontrado" });  
		}
		return res.status(200).json({ message: "Usuário editado com sucesso", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao editar usuário", error: error.message });
	}
}

const deleteUser = async (req, res) => {
	try {
		const [resultado] = await db.query("DELETE FROM usuario WHERE id_usuario = ?", [req.params.id_usuario]);

		if (resultado.affectedRows === 0) {  
			return res.status(404).json({ message: "Usuário não encontrado" });  
		}
		return res.status(200).json({ message: "Usuário deletado com sucesso", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
	}
}

module.exports = {
    createUser,
    getUsers,
    editUser,
    deleteUser
};