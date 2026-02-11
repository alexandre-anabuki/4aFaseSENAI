import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'desafio_veiculo_monitoramento',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default db