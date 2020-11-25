const express = require('express')
const { getCharacterDetails, getInventory } = require('../api/character.api')

const character = express.Router()

character.get('/details/:charId', (req, res) => {
    const { charId } = req.params
    getCharacterDetails(charId)
    .then(response => res.writeHead(200).json(response))
    .catch(err => res.writeHead(401).json({ msg: 'Error', data: null, error: err }))
})

character.get('/inventory/:charId', (req, res) => {
    const { charId } = req.params
    getInventory(charId)
    .then(response => res.writeHead(200).json(response))
    .catch(err => res.writeHead(401).json({ msg: 'Error', data: null, error: err }))
})

const isOwner = () => {
    
}

module.exports = character
