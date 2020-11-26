const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const { getUser, getUserAccessLevel } = require('../api/user.api')
const { getCharactersByUsername } = require('../api/character.api')
const { comparePasswords } = require('../helpers')
const { use } = require('passport')

const { SECRET } = process.env

/**
 * @description Passport middleware to check if user is authorized for the next request
 */
const isSignedIn = passport.authenticate('jwt', { session: false })

/**
 * @description Middleware that must be called after isSignedIn middleware, else it has no access to req.user. Also requires a username param.
 */
const hasUserAccessRights = async (req, res, next) => {
	const { username } = req.user // User doing the request
	const requestedUsername = req.params.username // User being requested
	const userAccessLevel = (await getUserAccessLevel(username)).accessLevel // Cannot be grabbed from token, as old token exists even after db changes

	// If the user requested its own data OR the user is admin
	if (username === requestedUsername || userAccessLevel == 8) {
		next()
	} else {
		res.status(400).json({ msg: 'Error', data: null, error: 'Request to account data not permitted by user' })
	}
}

/**
 * @description Middleware that must be called after isSignedIn middleware, else it has no access to req.user. Also requires a charId param.
 */
const hasCharacterAccessRights = async (req, res, next) => {
	const { username } = req.user // User doing the request
	const requestedCharacterId = req.params.charId // Character being requested
	const userCharacters = (await getCharactersByUsername(username)).map(character => character.charId.toString()) // Map the users characters to array of ids
	const userAccessLevel = (await getUserAccessLevel(username)).accessLevel // Cannot be grabbed from token, as old token exists even after db changes

	// If the user requested its own character data OR the user is admin
	if (userCharacters && userCharacters.includes(requestedCharacterId) || userAccessLevel == 8) {
		next()
	} else {
		res.status(400).json({ msg: 'Error', data: null, error: 'Request to character data not permitted by user' })
	}
}

// Passport set-up
passport.use(new JWTStrategy(
	{ secretOrKey: SECRET, jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() },
	async (token, callback) => {
		try {
			return callback(null, token.user)
		} catch (err) {
			callback(err)
		}
	}
))

passport.use('local', new LocalStrategy({
	// Override default fields
	usernameField: 'username', 
	passwordField: 'password'
}, (username, password, callback) => {
    getUser(username)
    .then(user => {
        if (!user) return callback(null, false, { message: 'User could not be found' })
        if (!comparePasswords(password, user.password)) return callback(err, null, { message: 'Invalid password' })
        callback(null, user, { message: 'Success' })
    })
    .catch(err => callback(err))
}))

module.exports = { passport, isSignedIn, hasUserAccessRights, hasCharacterAccessRights }