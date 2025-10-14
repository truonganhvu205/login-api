const jwt = require('jsonwebtoken')
const {refreshTokensDb} = require('../../../databases')
const {refreshTokenSecretKey} = require('../../../configs')

function verifyRefreshToken(req, res, next) {
    const refreshToken = req.body.token
    if(!refreshToken) {
        return res.sendStatus(401)
    }

    if(!refreshTokensDb.includes(refreshToken)) {
        return res.sendStatus(403)
    }

    jwt.verify(refreshToken, refreshTokenSecretKey, (err, data) => {
        if(err) {
            return res.sendStatus(403)
        }

        req.user = data
        next()
    })
}

module.exports = verifyRefreshToken
