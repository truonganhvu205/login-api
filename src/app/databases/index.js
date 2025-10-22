const authDbs = require('./auth')
const users = require('./usersList.database')

module.exports = {
    ...authDbs,
    users,
}
