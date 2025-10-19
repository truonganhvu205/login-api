const express = require('express')
const app = express()
const {setupAuthRoutes} = require('./app/routes')
const {authPort} = require('./app/configs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

setupAuthRoutes(app)

app.listen(authPort)
