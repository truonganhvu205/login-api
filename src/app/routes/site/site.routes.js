const express = require('express')
const router = express.Router()
const {siteController} = require('../../controllers')
const {authUser, authRole} = require('../../middlewares')

router.get('/', siteController.index)
router.get('/users-list',
    authUser,
    authRole(1),
    siteController.showList)

module.exports = router
