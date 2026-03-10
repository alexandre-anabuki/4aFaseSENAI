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

module.exports = {
    login
}