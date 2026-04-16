// Path: src/controller/Auth/AuthController.js

import bcrypt from "bcrypt";
import { prismaClient } from "../../prisma/prisma.js";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefresh,
} from "../../utils/jwt.js";


class AuthController {
    constructor() { }

    async register(
        req,
        res
    ) {
        try {
            const { email, senha, nome, cpf } = req.body;
            // Validação básica
            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }
            // Verificar se usuário já existe
            const existingUser = await prismaClient.usuario.findUnique({
                where: { email },
            });
            console.log(existingUser)
            if (existingUser) {
                return res.status(409).json({ error: "Usuário já existe" });
            }
            // Hash da senha com bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            // Criar usuário no banco de dados
            const user = await prismaClient.usuario.create({
                data: { email, senha: hashedPassword, nome: nome, cpf: cpf },
                select: {
                    id: true,
                    email: true,
                    nome: true,
                },
            });
            return res.status(201).json(user);
        } catch (error) {
            console.error("Erro no registro:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res.status(400).send("Not Found");
    };

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await prismaClient.usuario.findUnique({ where: { email } }); // Verificar se usuário existe e senha está correta
            if (!user || !(await bcrypt.compare(senha, user.senha))) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }
            // Gerar access token (curta duração)
            const accessToken = signAccessToken({
                userId: user.id,
                email: user.email,
                nome: user.nome,
            });

            // Gerar refresh token (longa duração)
            const refreshToken = signRefreshToken({
                userId: user.id,
                email: user.email,
                nome: user.nome,
            });
            // Armazenar refresh token no banco de dados
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            console.log(refreshToken)
            await prismaClient.token.create({
                data: {
                    token: refreshToken,
                    type: "refresh",
                    usuarioId: user.id,
                    expiresAt,
                },
            });
            res.status(200).json({
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    nome: user.nome,
                },
            });
        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res;
    };

    async esqueciSenha (req, res){
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

    async refresh(
        req,
        res
    ) {
        const { refreshToken } = req.body;
        const storedRefreshToken = await prismaClient.token.findFirst({
            where: { token: refreshToken },
        });
        if (
            !storedRefreshToken ||
            storedRefreshToken.revoked ||
            storedRefreshToken.expiresAt < new Date()
        )
            return res.status(401).json({ error: "invalid refresh token" });

        try {
            const payload = verifyRefresh(refreshToken);
            const accessToken = signAccessToken({
                userId: payload.userId,
                email: payload.email,
                nome: payload.nome,
            });
            return res.json({ accessToken });
        } catch {
            return res.status(401).json({ error: "invalid refresh token" });
        }
    };

    async logout(
        req,
        res
    ) {
        const { refreshToken } = req.body;
        try {
            const storedRefreshToken = await prismaClient.token.findFirst({
                where: { token: refreshToken },
            });
            if (
                !storedRefreshToken ||
                storedRefreshToken.revoked ||
                storedRefreshToken.expiresAt < new Date()
            )
                return res.status(401).json({ error: "invalid refresh token" });

            await prismaClient.token.updateMany({
                where: { id: storedRefreshToken?.id ?? 0 },
                data: { revoked: true },
            });
        } catch (error) {
            res.status(400).json(error)
        }

        return res.status(200).json("Usuário deslogado!");

    }
}


export const authController = new AuthController();