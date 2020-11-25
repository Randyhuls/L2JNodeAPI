const { connection } = require('../services/mysql.service')

const { l2gsConnection } = process.env

const getCharacterDetails = async (charId) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT * FROM characters WHERE charId = ${charId}`, (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })  
    })
}

const getInventory = (charId) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT * FROM items WHERE ownerId = ${charId}`, (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })  
    })
}

module.exports = { getCharacterDetails, getInventory }