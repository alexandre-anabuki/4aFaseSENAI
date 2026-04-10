const express = require("express")
const routeAgenda = express.Router()

const { getAgenda, criarAgenda, editAgenda, deleteAgenda } = require("../controller/agendamentoController.js")

routeAgenda.get('/usuario', getAgenda)
routeAgenda.post('/usuario', criarAgenda)
routeAgenda.patch('/usuario/:id', editAgenda)
routeAgenda.delete('/usuario/:id', deleteAgenda)

module.exports = routeAgenda