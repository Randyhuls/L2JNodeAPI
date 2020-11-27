const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const packageJSON = require('./package.json')
const { passport } = require('./services/auth.service')
const { l2gsConnection, l2lsConnection, connect } = require('./services/mysql.service')
const { AuthRoute, UserRoute } = require('./routes')

// ENV VARS
const { DISPLAY_NAME, PORT } = process.env

// EXPRESS CONFIG
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(passport.initialize())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'views')

// ROUTES
app.get('/', (_, res) => res.render('index.ejs', { packageJSON })) // TODO: Should pass all available endpoints with descriptions to be visible inside html

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