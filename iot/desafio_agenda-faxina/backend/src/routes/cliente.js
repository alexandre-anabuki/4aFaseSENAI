const express = require("express")
const routeCliente = express.Router()

const {criarCliente, editarCliente, buscarClientes, deletarCliente} = require ('../controller/clienteController.js')

routeCliente.post('/cliente', criarCliente)
routeCliente.get('/cliente', buscarClientes)
routeCliente.patch('/cliente/:id', editarCliente)
routeCliente.delete('/cliente/:email', deletarCliente)

module.exports = routeCliente