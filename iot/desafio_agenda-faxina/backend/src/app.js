const express = require('express')
const app = express()
const cors = require('cors')
const routerCliente = require('./routes/cliente.js')
const routerLogin = require('./routes/login.js')

app.use(cors())
app.use(express.json())
app.use(routerCliente)
app.use(routerLogin)

module.exports = app