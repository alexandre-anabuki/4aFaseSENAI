const express = require("express")
const routeUser = express.Router()

const {createUser} = require ('../controller/usuarioController.js')

routeUser.post('/usuario', createUser)

module.exports = routeUser