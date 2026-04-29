const express = require('express')
const app = express()
const cors = require('cors')
const routeCliente = require('./routes/cliente.js')
const routerLogin = require('./routes/login.js')

app.use(cors())
app.use(express.json())
app.use(routeCliente)
app.use(routerLogin)

module.exports = app