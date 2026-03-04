const express = require('express')
const app = express()
const cors = require('cors')
const routeUser = require('./routes/usuario.js')

app.use(cors())
app.use(express.json())
app.use(routeUser)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


module.exports = app