import database from "../config/database";
import bcrypt from "bcrypt"

const createUser = async (req, res) => {
    const {nome, email, senha, cpf} = req.body
}