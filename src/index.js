const express = require('express')
const app = express()
const {setupRoutes} = require('./app/routes')
const {serverPort} = require('./app/configs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

setupRoutes(app)

app.listen(serverPort)
