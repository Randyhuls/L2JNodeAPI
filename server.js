const express = require('express')
const app = express()
const packageJSON = require('./package.json')

// ENV VARS
const { DISPLAY_NAME, PORT, BASE_DEV_URL, PROD_DEV_URL } = process.env

const { isDEV } = require('./helpers')
const { AuthRoute, PlayerRoute, UserRoute } = require('./routes')

// GLOBALLY ACCESSIBLE
const baseUrl = isDEV() ? `${BASE_DEV_URL}` : `${PROD_DEV_URL}`

app.locals = {
    ...app.locals,
    baseUrl
}

// EXPRESS CONFIG
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))

// ROUTES
app.get('/', (_, res) => { res.render('index.ejs', { packageJSON }) })

// REST API
app.use('/auth', AuthRoute)
app.use('/player', PlayerRoute)
app.use('/user', UserRoute)

app.listen(1337, () => {
    console.log(`Running [${DISPLAY_NAME}]:[v${packageJSON.version}] on port [${PORT}]`)
})