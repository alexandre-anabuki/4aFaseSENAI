const mysql= require('mysql2/promise') ;
const dotenv= require('dotenv') ;
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'senai',
    database: process.env.DB_DATABASE ?? 'hotel_db',
});

module.exports = db;