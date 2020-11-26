const express = require('express')
const user = express.Router()
const { getUserDetails } = require('../api/user.api')
const { getCharacterDetails } = require('../api/character.api')
const { isSignedIn, hasUserAccessRights, hasCharacterAccessRights } = require('../services/auth.service')

/**
 * @description Get account details by username
 */
user.get('/account/:username', [isSignedIn, hasUserAccessRights], (req, res) => {
    const { username } = req.params    
    getUserDetails(username)    
    .then(response => {
        if (!response || response.length === 0) {
            res.status(400).json({ msg: 'Error', data: null, error: 'User does not exist' })
        } else {
            res.status(200).json({ msg: 'Success', data: response, error: null })
        }
    })
    .catch(err => res.status(401).json({ msg: 'Error', data: null, error: err }))
})

/**
 * @description Get character details by character id
 */
user.get('/character/:charId/', [isSignedIn, hasCharacterAccessRights], (req, res) => {
    const { charId } = req.params
    getCharacterDetails(charId)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(401).json({ msg: 'Error', data: null, error: err }))
})

/**
 * @description Get character inventory details by character id
 */
user.get('/inventory/:charId', [isSignedIn, hasCharacterAccessRights], (req, res) => {
    const { charId } = req.params
    getInventory(charId)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(401).json({ msg: 'Error', data: null, error: err }))
})

module.exports = user
