const usersDb = require('./users.database')
const refreshTokensDb = require('./refreshTokens.database')
const rolesDb = require('./roles.database')

const authDbs = {
    usersDb,
    refreshTokensDb,
    rolesDb,
}

module.exports = authDbs
