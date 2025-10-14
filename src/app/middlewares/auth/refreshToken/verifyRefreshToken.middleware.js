const {refreshTokensDb} = require('./app/databases')
const {refreshToken} = require('../../../configs')

function verifyRefreshToken(req, res, next) {
    const {token} = req.body
    if(!token) {
        return res.sendStatus(401)
    }

    if(!refreshTokensDb.includes(token)) {
        return res.sendStatus(403)
    }

    jwt.verify(token, refreshToken, (err, data) => {
        if(err) {
            return res.sendStatus(403)
        }

        req.user = data
        next()
    })
}

module.exports = verifyRefreshToken
