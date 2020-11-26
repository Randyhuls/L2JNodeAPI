const { l2lsConnection } = require('../services/mysql.service')
const { encryptPassword } = require('../helpers')

const createUser = (username, password) => {
    const _ = new Date(), y = _.getFullYear(), mo = ('0'+(_.getMonth()+1)).slice(-2), d = ('0'+_.getDate()).slice(-2), h = _.getHours(), mi = _.getMinutes(), s = _.getSeconds()
    const createdAtL2JFormat = `${y}-${mo}-${d} ${h}:${mi}:${s}`
    const data = {
        'login': username,
        'password': encryptPassword(password),
        'accessLevel': 0,
        'created_time': createdAtL2JFormat
    }

    return new Promise((resolve, reject) => {
        l2lsConnection.query('INSERT INTO accounts SET ?',
        data, 
        (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })
    })
}

const getUser = (username) => {
    return new Promise((resolve, reject) => {
        l2lsConnection.query(`
            SELECT login, password, accessLevel 
            FROM accounts 
            WHERE login = '${username}' 
            LIMIT 1
        `,
        (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })
    })
}

const getUserDetails = (username) => {
    return new Promise((resolve, reject) => {
        l2lsConnection.query(`
            SELECT login, email, accessLevel, created_time, lastactive, lastServer 
            FROM accounts 
            WHERE login = '${username}' 
            LIMIT 1
        `, 
        (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })
    })
}

const getUserAccessLevel = (username) => {
    return new Promise((resolve, reject) => {
        l2lsConnection.query(`
            SELECT accessLevel
            FROM accounts 
            WHERE login = '${username}' 
            LIMIT 1
        `, 
        (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })
    })
}

module.exports = { createUser, getUser, getUserDetails, getUserAccessLevel }