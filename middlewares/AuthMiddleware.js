require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader.split(' ')[1]

    if(!token) {
        res.sendStatus(401)
        return
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            res.sendStatus(403)
            return
        } else {
            next()
        }
    })
}
