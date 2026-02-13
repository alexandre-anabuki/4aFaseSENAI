import express from 'express'
import cors from 'cors'

const app = express()

import { router } from "./routers/veiculo.js"


app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('hello')
})

app.use("/veiculo", router)




export default app