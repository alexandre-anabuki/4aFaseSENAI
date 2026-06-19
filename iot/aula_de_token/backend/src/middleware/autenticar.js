import jwt from "jsonwebtoken"

export const autenticar = (req, res, next) => {
    const token = req.headers.authorization?.split('')[1]

    if(!token){
        return res.status(401).json({message: "Token não fornecido!"})
    }

    try {
        req.usuario = jwt.verify(token, process.env.ACCESS_SECRET)
        next() //próximo passo é ir para o servidor
    } catch (error) {
        return res.status(401).json({message: "Token expirado ou inválido!"})
    }
}