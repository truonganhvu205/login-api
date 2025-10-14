const {usersDb} = require('../../../databases')
const {comparePass} = require('../../../utils')

function verifyUserLogin(req, res, next) {
    const {username, password} = req.body

    const user = usersDb.find(user => user.username === username)
    if(!user) {
        return res.sendStatus(401)
    }

    const isMatch = comparePass(password, user.password)
    if(!isMatch) {
        return res.sendStatus(403)
    }

    req.user = user
    next()
}

module.exports = verifyUserLogin
