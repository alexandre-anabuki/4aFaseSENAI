const express = require("express")
const routerCliente = express.Router()

const {criarCliente, editarCliente, buscarClientes, deletarCliente} = require ('../controller/clienteController.js')

routerCliente.post('/cliente', criarCliente)
routerCliente.get('/cliente', buscarClientes)
routerCliente.patch('/cliente/:id', editarCliente)
routerCliente.delete('/cliente/:email', deletarCliente)

module.exports = routerCliente