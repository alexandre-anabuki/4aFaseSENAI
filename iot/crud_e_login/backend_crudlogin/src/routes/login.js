const express = require('express')
const routerLogin = express.Router()
const {login, esqueciSenha} = require('../controller/loginController')

routerLogin.post('/login', login)
routerLogin.post('/login/esqueci_senha', esqueciSenha)

module.exports = routerLogin