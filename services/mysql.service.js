const mysql = require('mysql')

const { SQL_HOST, SQL_USER, SQL_PASSWORD, SQL_DATABASE } = process.env

const connection = mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE
})

const connect = () => {
    connection.connect()
}

module.exports = { connection, connect }