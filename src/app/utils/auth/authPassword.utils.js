const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPass = password => bcrypt.hashSync(password, saltRounds)
const comparePass = (password, hashedPass) => bcrypt.compareSync(password, hashedPass)

const authPassword = {hashPass, comparePass}

module.exports = authPassword
