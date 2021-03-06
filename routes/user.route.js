const express = require('express')
const user = express.Router()
const { getUserDetails } = require('../api/user.api')
const { getCharactersByUsername, getCharacterDetails, getInventory } = require('../api/character.api')
const { isSignedIn, hasUserAccessRights, hasCharacterAccessRights } = require('../services/auth.service')

/**
 * @description Get account details by username
 */
user.get('/account/:username', [isSignedIn, hasUserAccessRights], (req, res) => {
    const { username } = req.params    
    getUserDetails(username)    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'User does not exist' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(401).json({ status: 401, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get character details by character id
 */
user.get('/character/:charId/', [isSignedIn, hasCharacterAccessRights], (req, res) => {
    const { charId } = req.params
    getCharacterDetails(charId)
    .then(response => res.status(200).json({ status: 200, msg: 'Success', data: response, error: null }))
    .catch(err => res.status(401).json({ status: 401, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get character inventory details by character id
 */
user.get('/inventory/:charId', [isSignedIn, hasCharacterAccessRights], (req, res) => {
    const { charId } = req.params
    getInventory(charId)
    .then(response => res.status(200).json({ status: 200, msg: 'Success', data: response, error: null }))
    .catch(err => res.status(401).json({ status: 401, msg: 'Error', data: null, error: err }))
})

/**
 * @description Get all characters by username
 */
user.get('/characters/:username/', [isSignedIn, hasUserAccessRights], (req, res) => {
    const { username } = req.params
    getCharactersByUsername(username)
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ status: 400, msg: 'Error', data: null, error: 'User has not yet created a character' })
        } else {
            res.status(200).json({ status: 200, msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(401).json({ status: 401, msg: 'Error', data: null, error: err }))
})

module.exports = user
