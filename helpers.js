const pack = require('php-pack').pack
const crypto = require('crypto')

const isDEV = () => process.env.NODE_ENV === 'development'
const isPROD = () => process.env.NODE_ENV === 'production'

/**
 * @description Pass plain text string to encrypt as L2J encrypted password
 * @returns string
 * @param {string} str 
 */
const encryptPassword = (str) => {
    const sha1Str = crypto.createHash('sha1').update(str, 'utf-8').digest('hex')
    const packedStr = pack('H*', sha1Str)
    return Buffer.from(packedStr).toString('base64')
}

/**
 * @description Pass the plain text password and the L2J encrypted password for comparison
 * @returns boolean
 * @param {string} plainPassword 
 * @param {string} encryptedPassword 
 */
const comparePasswords = (plainPassword, encryptedPassword) => {
    return plainPassword && encryptedPassword && encryptPassword(plainPassword) === encryptedPassword
}

module.exports = { isDEV, isPROD, encryptPassword, comparePasswords }