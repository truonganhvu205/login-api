const authPassword = require('./authPassword.utils')
const authToken = require('./authToken.utils')

const auth = {
    ...authPassword,
    ...authToken,
}

module.exports = auth
