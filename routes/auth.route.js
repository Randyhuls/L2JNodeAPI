const jwt = require('jsonwebtoken')
const express = require('express')
const { passport } = require('../services/auth.service')
const { createUser, getUser } = require('../api/user.api')

const { SECRET } = process.env

const auth = express.Router()

auth.get('/sign-in', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (!user || err) {
            return res.status(401).json({ status: 401, msg: 'Error', data: null, error: 'Username or password are incorrect' })
        } else {
            req.login(user, { session: false }, (err) => {
                if (err) return res.status(401).json({ status: 401, msg: 'Error', data: err, error: 'Unable to authenticate user' })

                // Sign and return json web token
                const token = signJSONWebToken(user)

                // Return token to user for local storage
                return res.status(200).json({ status: 200, msg: 'Success', data: { token }, error: null })
            })
        }
    })(req, res, next)
})

auth.post('/register', (req, res) => {
    const { username, password, passwordConfirmation } = req.body

    if (username && password === passwordConfirmation) {
        createUser(username, password)
        .then(async () => {
            const user = await getUser(username)
            
            if (!user) res.status(500).json({ status: 500, msg: 'Error', data: err, error: 'Could not retrieve user' })

            req.login(user, { session: false }, err => {
                if (err) return res.status(401).json({ status: 401, msg: 'Error', data: err, error: 'Unable to authenticate user' })
                
                // Sign and return json web token
                const token = signJSONWebToken(user)

                // Return token to user for local storage
                return res.status(200).json({ status: 200, msg: 'Success', data: { token }, error: null })
            })
        })
        .catch(err => res.status(400).json({ status: 400, msg: 'Error', data: err, error: 'Could not create user account' }))
    } else if (!username) {
        return res.status(401).json({ status: 401, msg: 'Error', data: err, error: 'Username is required' })
    } else {
        return res.status(401).json({ status: 401, msg: 'Error', data: err, error: 'Passwords do not match' })
    }
})

const signJSONWebToken = (user) => {
    // Sign json web token
    const body = { username: user.login, email: user.email || '', accessLevel: user.accessLevel }
    const token = jwt.sign({ user: body }, SECRET)

    // Return user_id to user for local storage
    return token
}

module.exports = auth
