const express = require("express")
const routerQuarto = express.Router()

const {criarQuarto, editarQuarto, buscarQuartos, deletarQuarto} = require ('../controller/quartoController.js')

routerQuarto.post('/quarto', criarQuarto)
routerQuarto.get('/quarto', buscarQuartos)
routerQuarto.patch('/quarto/:id', editarQuarto)
routerQuarto.delete('/quarto/:funcionario_id', deletarQuarto)

module.exports = routerQuarto