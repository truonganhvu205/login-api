const site = require('./site')
const auth = require('./auth')

module.exports = {
    ...site,
    ...auth,
}
