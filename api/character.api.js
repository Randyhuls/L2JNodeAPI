const { l2gsConnection } = require('../services/mysql.service')

const getCharacterDetails = async (charId) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT * FROM characters WHERE charId = ${charId}`, (err, results) => {
            console.log(err, results)
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getInventory = (charId) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT * FROM items WHERE ownerId = ${charId}`, (err, results) => {
            console.log(err, results)
            if (err) return reject(err)
            resolve(results)
        })  
    })
}

module.exports = { getCharacterDetails, getInventory }