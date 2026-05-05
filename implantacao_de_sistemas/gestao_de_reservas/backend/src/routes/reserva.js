const express = require("express")
const routerReserva = express.Router()

const {criarReserva, editarReserva, buscarReservas, deletarReserva} = require ('../controller/reservaController.js')

routerReserva.post('/reserva', criarReserva)
routerReserva.get('/reserva', buscarReservas)
routerReserva.patch('/reserva/:id', editarReserva)
routerReserva.delete('/reserva/:email', deletarReserva)

module.exports = routerReserva