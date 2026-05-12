const express = require("express")
const routerReserva = express.Router()

const {criarReserva, editarReserva, buscarReservas, deletarReserva} = require ('../controller/reservaController.js')

routerReserva.post('/reserva', criarReserva)
routerReserva.get('/reserva', buscarReservas)
routerReserva.patch('/reserva/:id_reserva', editarReserva)
routerReserva.delete('/reserva/:id_reserva', deletarReserva)

module.exports = routerReserva