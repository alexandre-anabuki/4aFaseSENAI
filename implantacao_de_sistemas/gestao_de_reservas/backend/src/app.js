const express = require('express')
const app = express()
const cors = require('cors')
const routerLogin = require('./routes/login.js')
const routerCliente = require('./routes/cliente.js')
const routerFuncionario = require('./routes/funcionario.js')
const routerReserva = require('./routes/reserva.js')
const routerQuarto = require('./routes/quarto.js')

app.use(cors())
app.use(express.json())
app.use(routerLogin)
app.use(routerCliente)
app.use(routerFuncionario)
app.use(routerReserva)
app.use(routerQuarto)

module.exports = app