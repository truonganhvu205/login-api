const jwt = require('jsonwebtoken')
const {accessTokenSecretKey} = require('../../configs')

function authUser(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]

    if(!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, accessTokenSecretKey, (err, data) => {
        if(err) {
            return res.sendStatus(403)
        } else {
            next()
        }
    })
}

module.exports = authUser
