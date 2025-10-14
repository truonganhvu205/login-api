const authUser = require('./auth/authUser.middleware')
const validateLoginInput = require('./auth/login/validateLoginInput.middleware')
const verifyUserLogin = require('./auth/login/verifyUserLogin.middleware')
const validateRegisterInput = require('./auth/register/validateRegisterInput.middleware')
const verifyUserRegister = require('./auth/register/verifyUserRegister.middleware')
const verifyRefreshToken = require('./auth/refreshToken/verifyRefreshToken.middleware')

module.exports = {
    authUser, 
    validateLoginInput, 
    verifyUserLogin, 
    validateRegisterInput, 
    verifyUserRegister, 
    verifyRefreshToken, 
}
