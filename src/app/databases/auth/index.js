const usersDb = require('./users.database')
const refreshTokensDb = require('./refreshTokens.database')

const authDbs = {usersDb, refreshTokensDb}

module.exports = authDbs
