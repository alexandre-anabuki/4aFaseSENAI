import express from 'express'
import cors from 'cors'
import mysql2 from 'mysql2/promise'

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('hello')
})

export default app