const express = require("express")
const routerAgenda = express.Router()

const {criarAgenda, editarAgenda, buscarAgendas, deletarAgenda} = require ('../controller/agendamentoController.js')

routerAgenda.post('/agendamento', criarAgenda)
routerAgenda.get('/agendamento', buscarAgendas)
routerAgenda.patch('/agendamento/:id', editarAgenda)
routerAgenda.delete('/agendamento/:id', deletarAgenda)

module.exports = routerAgenda