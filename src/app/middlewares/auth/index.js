const authUser = require('./authUser.middleware')
const validateLoginInput = require('./login/validateLoginInput.middleware')
const verifyUserLogin = require('./login/verifyUserLogin.middleware')
const validateRegisterInput = require('./register/validateRegisterInput.middleware')
const verifyUserRegister = require('./register/verifyUserRegister.middleware')
const verifyRefreshToken = require('./refreshToken/verifyRefreshToken.middleware')

const authMiddlewares = {
    authUser, 
    validateLoginInput, 
    verifyUserLogin, 
    validateRegisterInput, 
    verifyUserRegister, 
    verifyRefreshToken, 
}

module.exports = authMiddlewares
