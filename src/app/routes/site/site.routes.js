const express = require('express')
const router = express.Router()
const {siteController} = require('../../controllers')
const {authUser} = require('../../middlewares')

router.get('/', siteController.index)
router.get('/people', authUser, siteController.showList)

module.exports = router
