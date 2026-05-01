const express = require('express')
const app = express()
const cors = require('cors')
const routerCliente = require('./routes/cliente.js')
const routerLogin = require('./routes/login.js')
const routerAgenda = require('./routes/agendamento.js')

app.use(cors())
app.use(express.json())
app.use(routerCliente)
app.use(routerLogin)
app.use(routerAgenda)

module.exports = app