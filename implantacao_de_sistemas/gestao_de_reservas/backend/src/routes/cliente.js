const express = require("express")
const routerCliente = express.Router()

const {criarCliente, editarCliente, buscarClientes, deletarCliente} = require ('../controller/clienteController.js')

routerCliente.post('/cliente', criarCliente)
routerCliente.get('/cliente', buscarClientes)
routerCliente.patch('/cliente/:id_cliente', editarCliente)
routerCliente.delete('/cliente/:id_cliente', deletarCliente)

module.exports = routerCliente