const express = require('express')
const app = express()
const cors = require('cors')
const routerLogin = require('./controller/loginController')
const routerCliente = require('./controller/clienteController')
const routerFuncionario = require('./controller/funcionarioControlller')
const routerReserva = require('./controller/reservaController')
const routerQuarto = require('./controller/quartoController')

app.use(cors())
app.use(express.json())
app.use(routerLogin)
app.use(routerCliente)
app.use(routerFuncionario)
app.use(routerReserva)
app.use(routerQuarto)

module.exports = app