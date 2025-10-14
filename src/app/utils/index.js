const authPassword = require('./auth/authPassword.utils')
const authToken = require('./auth/authToken.utils')

const auth = {
    ...authPassword,
    ...authToken,
}

module.exports = auth
