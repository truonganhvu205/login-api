const authRouter = require('./auth.routes')

function setupAuthRoutes(app) {
    app.use('/user', authRouter)
}

module.exports = setupAuthRoutes
