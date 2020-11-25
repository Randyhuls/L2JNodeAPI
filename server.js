const express = require('express')
const app = express()
const packageJSON = require('./package.json')
const { l2gsConnection, l2lsConnection, connect } = require('./services/mysql.service')

// ENV VARS
const { DISPLAY_NAME, PORT, BASE_DEV_URL, PROD_DEV_URL } = process.env

const { isDEV } = require('./helpers')
const { AuthRoute, CharacterRoute, UserRoute } = require('./routes')

// GLOBALLY ACCESSIBLE
const baseUrl = isDEV() ? `${BASE_DEV_URL}` : `${PROD_DEV_URL}`
app.locals = { ...app.locals, baseUrl }

// EXPRESS CONFIG
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))

// ROUTES
app.get('/', (_, res) => { res.render('index.ejs', { packageJSON }) })

// REST API
app.use('/auth', AuthRoute)
app.use('/character', CharacterRoute)
app.use('/user', UserRoute)

app.listen(PORT, () => {
    connect()
    console.log(`Running [${DISPLAY_NAME}]:[v${packageJSON.version}] on port [${PORT}]`)    
})

// ON FATAL SERVER ERROR
process.on('SIGINT', () => {
    // Kill database connections
    l2gsConnection.destroy()
    l2lsConnection.destroy()
})