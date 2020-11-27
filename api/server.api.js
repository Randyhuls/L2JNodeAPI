const netstats = require('netstats')
const { l2gsConnection, l2lsConnection } = require('../services/mysql.service')

const { L2J_G_PORT, L2J_L_PORT } = process.env

const getServers = () => {
    return Promise.all([
        netstats(parseInt(L2J_G_PORT)), 
        netstats(parseInt(L2J_L_PORT))
    ])
}

const getAnnouncements = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT * FROM announcements DESC', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getLongestPlayTimePlayers = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT char_name, onlinetime FROM characters ORDER BY onlinetime DESC LIMIT 10', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getTopLevelPlayers = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT char_name, level FROM characters ORDER BY level DESC LIMIT 10', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getTopPVPers = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT char_name, pvpkills FROM characters ORDER BY pvpkills DESC LIMIT 10', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getTopPKers = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT char_name, pkkills FROM characters ORDER BY pkkills DESC LIMIT 10', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getOnlinePKers = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT char_name FROM characters WHERE karma > 0 AND online = 1', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

const getNrOfOnlinePlayers = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT COUNT(charId) as onlinePlayers FROM characters WHERE online = 1', (err, results) => {
            if (err) return reject(err)
            resolve(results[0])
        })
    })
}

const getGMs = () => {
    return new Promise((resolve, reject) => {
        l2gsConnection.query('SELECT char_name, online FROM characters WHERE accessLevel = 8', (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

module.exports = { 
    getServers, getAnnouncements, getNrOfOnlinePlayers, getGMs, getLongestPlayTimePlayers,
    getTopLevelPlayers, getTopPVPers, getTopPKers, getOnlinePKers
 }