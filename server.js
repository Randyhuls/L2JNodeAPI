const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send(`<h1>L2J API</h1>`)
})

app.listen(1337, () => {
    console.log(`Running L2J api on port 1337`)
})