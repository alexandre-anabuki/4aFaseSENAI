const express = require("express")
const routeUser = express.Router()

const {createUser, deleteUser, editUser, getUsers} = require ('../controller/usuarioController.js')

routeUser.get('/usuario', getUsers)
routeUser.post('/usuario', createUser)
routeUser.patch('/usuario/:id', editUser)
routeUser.delete('/usuario/:id', deleteUser)

module.exports = routeUser