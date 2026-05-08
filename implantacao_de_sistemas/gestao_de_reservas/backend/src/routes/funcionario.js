const express = require("express")
const routerFuncionario = express.Router()

const {criarFuncionario, editarFuncionario, buscarFuncionarios, deletarFuncionario} = require ('../controller/funcionarioControlller.js')

routerFuncionario.post('/funcionario', criarFuncionario)
routerFuncionario.get('/funcionario', buscarFuncionarios)
routerFuncionario.patch('/funcionario/:id', editarFuncionario)
routerFuncionario.delete('/funcionario/:email', deletarFuncionario)

module.exports = routerFuncionario