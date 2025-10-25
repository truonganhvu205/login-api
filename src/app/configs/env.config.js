require('dotenv').config()

const configEnv = {
    serverPort: process.env.SERVER_PORT,
    authPort: process.env.AUTH_PORT,
    adminUser: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
}

module.exports = configEnv
