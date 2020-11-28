const express = require('express')
const server = express.Router()
const { 
    getServers, getTopLevelPlayers, getNrOfOnlinePlayers, getAnnouncements, getGMs, 
    getLongestPlayTimePlayers, getOnlinePKers, getTopPKers, getTopPVPers 
} = require('../api/server.api')
const { isSignedIn } = require('../services/auth.service')

/**
 * @description Get status info on servers
 */
server.get('/status', (req, res) => {
    getServers()    
    .then(response => {
        let isOnline = !!response

        if (!isOnline) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'Servers unavailable' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: { isOnline }, error: null })
        }
    })
    .catch(err => res.status(401).json({ status: 401, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get announcements
 */
server.get('/announcements', (req, res) => {
    getAnnouncements()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(200).json({ status: 200, msg: 'Error', data: null, error: 'No announcements available' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get Top 10 highest level players
 */
server.get('/top-players', (req, res) => {
    getTopLevelPlayers()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'Servers unavailable' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get Top 10 highest pkers
 */
server.get('/top-pkers', (req, res) => {
    getTopPKers()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'Servers unavailable' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get Top 10 highest pvpers
 */
server.get('/top-pvpers', (req, res) => {
    getTopPVPers()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'Servers unavailable' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get Top 10 players that played the most
 */
server.get('/top-playtime-players', (req, res) => {
    getLongestPlayTimePlayers()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'Servers unavailable' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get GMs, including whether they are online or offline
 */
server.get('/gms', (req, res) => {
    getGMs()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'Servers unavailable' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get online pkers
 */
server.get('/online-pkers', (req, res) => {
    getOnlinePKers()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(200).json({ status: 200, msg: 'Success', data: null, error: 'No pkers online' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get number of online players
 */
server.get('/online-players', (req, res) => {
    getNrOfOnlinePlayers()    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(200).json({ status: 200, msg: 'Success', data: null, error: 'No players online' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: null, error: err }))
})

module.exports = server