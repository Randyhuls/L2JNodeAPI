const { l2gsConnection } = require('../services/mysql.service')

const getCharactersByUsername = (username) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT charId, char_name, level, base_class, race FROM characters WHERE account_name = '${username}'`, (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getCharacterDetails = (charId) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT * FROM characters WHERE charId = '${charId}'`, (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })
    })
}

const getInventory = (charId) => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query(`SELECT * FROM items WHERE owner_id = '${charId}'`, (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })  
    })
}

module.exports = { getCharactersByUsername, getCharacterDetails, getInventory }