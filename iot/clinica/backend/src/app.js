const express = require('express')
const cors = require('cors')
const routeUser = require('./routes/usuario.js')
const routerLogin = require('./routes/login.js')
const routeAgenda = require('./routes/agendamento.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routerLogin)
app.use(routeUser)
app.use(routeAgenda)


module.exports = {app}