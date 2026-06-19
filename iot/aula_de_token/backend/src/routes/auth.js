import { Router } from "express";
import jwt from "jsonwebtoken"

const router = Router()

//substitui pela consulta de dados
const refreshTokenValidate = new Set()

function gerarTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: "10s"})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "7d"})

    refreshTokenValidate.add(refreshToken)

    return{
        accessToken, refreshToken
    }
}

//rota de login -> http://localhost:8081/auth/login
router.post('/login', (req,res) =>{
    const {email, senha} = req.body

    //simulador
    if(email !== "aluno@senai.com.br" || senha !== "abc123"){
        return res.status(401).json({message: "Credenciais inválidas"})
    }

    const {accessToken, refreshToken} = gerarTokens({email})

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:false, //trocar para true quando subir para produção
        sameSite: "strict",
        maxAge: 7 * 24 * 60 *60 * 1000 // 7 dias em milesegundos
    })

    res.json({accessToken})

})

router.post("/refresh", (req, res) =>{
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({message: "Sem refresh token"})
    }

    if(!refreshTokenValidate.has(refreshToken)){
        return res.status(401).json({message: "Refresh token inválido ou expirado"})
    }

    //payload = req.body
    //"...payload" significa [email, senha]

    try {
        const {iat, exp, ...payload} = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: "10s"})
        res.json({accessToken})
    } catch (error) {
        return res.status(403).json({message: "Refresh token expirado ou inválido"})
    }
})

export default router