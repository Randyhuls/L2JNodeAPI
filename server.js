const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const packageJSON = require('./package.json')
const { passport } = require('./services/auth.service')
const { l2gsConnection, l2lsConnection, connect } = require('./services/mysql.service')

const app = express()

// ENV VARS
const { DISPLAY_NAME, PORT, BASE_DEV_URL, PROD_DEV_URL } = process.env

const { isDEV } = require('./helpers')
const { AuthRoute, UserRoute } = require('./routes')

// GLOBALLY ACCESSIBLE
const baseUrl = isDEV() ? `${BASE_DEV_URL}` : `${PROD_DEV_URL}`
app.locals = { ...app.locals, baseUrl }

// EXPRESS CONFIG
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(passport.initialize())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'views')

// ROUTES
app.get('/', (_, res) => res.render('index.ejs', { packageJSON })) // Should pass all available endpoints with descriptions

// REST API
app.use('/auth', AuthRoute)
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