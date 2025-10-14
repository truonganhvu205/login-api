const authPassword = require('./authPassword.utils')
const authToken = require('./authToken.utils')

const authUtils = {
    ...authPassword,
    ...authToken,
}

module.exports = authUtils
