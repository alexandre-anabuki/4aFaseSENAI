import express from "express"
import cors from "cors"

const app = express()
const PORT = 3000

app.use(express())
app.use(cors())


app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})