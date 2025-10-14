const jwt = require('jsonwebtoken')
const {accessToken} = require('../../configs')

function authUser(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]

    if(!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, accessToken, (err, data) => {
        if(err) {
            return res.sendStatus(403)
        } else {
            next()
        }
    })
}

module.exports = authUser
