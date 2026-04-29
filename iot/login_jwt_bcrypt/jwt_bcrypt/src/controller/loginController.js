    const db = require ('../config/db.js')
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    const dotenv = require('dotenv')

dotenv.config()

const login = async(req, res) => {

    try{
        const {email, senha} = req.body
    
        if(email === "" || senha === ""){
            return res.status(400).json({message: "Email ou senha inválidos", success: false})
        }
    
        const [result] = await db.query("SELECT id_usuario, nome, email, senha, tipo FROM usuario WHERE email = ? LIMIT 1", [email])
    
        if(result.length === 0){
            return res.status(400).json({message: "credenciais inválidas", success: false})
        }
    
        const user = result[0]
    
        const ok = await bcrypt.compare(senha, user.senha)
        if(!ok){
            return res.status(401).json({message: "credenciais inválidas", success: false})
        }
    
        const token = jwt.sign(
            {
                sub: user.id_usuario,
                tipo: user.tipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1H"
            }
        )
    
        return res.status(200).json({
            message: "Login realizado com sucesso",
            token: token,
            user: {
                id: user.id_usuario,
                nome: user.nome,
                email: user.email,
                tipo: user.tipo
            },
            success : true
        })

    } catch (error){
        return res.status(500).json({message: "Erro ao criar ususário", erro: error.message})
    }

}

const esqueciSenha = async (req, res) => {
    try{

        const email = req.body.email
        const senha = req.body.senha_nova
        const confirmaSenha = req.body.confirmar_senha


        if(email === ""){
            return res.status(400).json({message: "Email não deve estar vazio", success: false})
        }

        if(senha === ""){
            return res.status(400).json({message: "A nova senha não deve estar vazio", success: false})
        } else{
            if(senha.lenght < 6 || senha.lenght > 12){
                return res.status(400).json({message: "senha deve ter entre 6 a 12 caracteres", success: false})

            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
            if( !passwordRegex.test(senha)){
                return res.status(400).json({message: "Requisitos minimos para criar a senha não satisfeitos", success: false})
            }
        }

        if(confirmaSenha === ""){

            return res.status(400).json({message: "O campo confirmar senha não deve estar vazio", success: false})

        } else{
            if(confirmaSenha !== senha){
                return res.status(400).json({message: "O campo confirmar não é igual a senha, tente novamente", success: false})
            }
        }

        const [row] = await db.query("SELECT id_usuario FROM usuario WHERE email = ?", [email])

        if(row.lenght === 0){
            res.status(400).json({message: "Usuario não encontrado", success: false})
        }

        const user = row[0]

        const saltRound = 10
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("UPDATE usuario SET senha = ? WHERE id_usuario = ?", [hashPassword, user.id_usuario])
        

        if(result.affectedRows === 0){
            return res.status(400).json({message: "Não foi possível alterar senha", success: false})
        }

        return res.status(201).json({message: "Senha alterada com sucesso", success: true})

    } catch (error) {
        return res.status(500).json({message: "Erro ao criar ususário", erro: error.message})
    }
}

module.exports = {
    login, esqueciSenha
}