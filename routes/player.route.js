const express = require('express')
const { getCharacterDetails, getInventory } = require('../api/player.api')

const player = express.Router()

player.get('/character-details/:charId', (req, res) => {
    const { charId } = req.params
    getCharacterDetails(charId)
    .then(response => res.writeHead(200).json(response))
    .catch(err => res.writeHead(401).json({ msg: 'Error', data: null, error: err }))
})

player.get('/inventory/:id', (req, res) => {
    const { charId } = req.params
    getInventory(charId)
    .then(response => res.writeHead(200).json(response))
    .catch(err => res.writeHead(401).json({ msg: 'Error', data: null, error: err }))
})

const isOwner = () => {
    
}

module.exports = player
