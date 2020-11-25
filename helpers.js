const pack = require('php-pack').pack
const crypto = require('crypto')

const isDEV = () => process.env.NODE_ENV === 'development'
const isPROD = () => process.env.NODE_ENV === 'production'

const encryptPassword = (str) => {
    const sha1Str = crypto.createHash('sha1').update(str, 'utf-8').digest('hex')
    const packedStr = pack('H*', sha1Str)
    return Buffer.from(packedStr).toString('base64')
}

const comparePasswords = (plainPassword, encryptedPassword) => {
    return plainPassword && encryptedPassword && encryptPassword(plainPassword) === encryptedPassword
}

module.exports = { isDEV, isPROD, encryptPassword, comparePasswords }