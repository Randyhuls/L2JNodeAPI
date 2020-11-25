const mysql = require('mysql')

const { SQL_HOST, SQL_PORT, SQL_USER, SQL_PASSWORD, SQL_L2GS_DATABASE, SQL_L2LS_DATABASE } = process.env

const basicDBConfig = {
    host: SQL_HOST,
    port: SQL_PORT,
    user: SQL_USER,
    password: SQL_PASSWORD
}

const l2gsConnection = mysql.createConnection({
    ...basicDBConfig,
    database: SQL_L2GS_DATABASE
})

const l2lsConnection = mysql.createConnection({
    ...basicDBConfig,
    database: SQL_L2LS_DATABASE
})

const connect = () => {
    l2gsConnection.on('connect', () => console.log(`Running database [${SQL_L2GS_DATABASE}] on port [${SQL_PORT}]`))
    l2gsConnection.on('error', (err) => console.error(`Error while starting database [${SQL_L2GS_DATABASE}]`, err))

    l2lsConnection.on('connect', () => console.log(`Running database [${SQL_L2LS_DATABASE}] on port [${SQL_PORT}]`))
    l2lsConnection.on('error', (err) => console.error(`Error while starting database [${SQL_L2LS_DATABASE}]`, err))

    l2gsConnection.connect()
    l2lsConnection.connect()
}

module.exports = { l2gsConnection, l2lsConnection, connect }