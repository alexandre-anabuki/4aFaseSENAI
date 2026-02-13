import mysql from 'mysql2/promise'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'desafio_veiculo_monitoramento'
})

export default db