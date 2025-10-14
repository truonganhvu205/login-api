const {usersDb} = require('../../../databases')

function verifyUserRegister(req, res, next) {
    const {username} = req.body

    let user = usersDb.find(user => user.username === username)
    if(user) {
        return res.sendStatus(409)
    }
    
    next()
}

module.exports = verifyUserRegister
