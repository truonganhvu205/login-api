const express = require('express')
const router = express.Router()
const {authController} = require('../../controllers')
const {
    validateLoginInput,
    verifyUserLogin,
    validateRegisterInput,
    verifyUserRegister,
    verifyRefreshToken,
} = require('../../middlewares')

router.post('/register',
    validateRegisterInput,
    verifyUserRegister,
    authController.userRegister)
    
// router.get('/register-get', authController.userRegisterGet)

router.post('/login',
    validateLoginInput,
    verifyUserLogin,
    authController.userLogin)

router.post('/refresh-token', verifyRefreshToken, authController.userRefreshToken)
router.post('/logout', verifyRefreshToken, authController.userLogout)

module.exports = router
