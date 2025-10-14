require('dotenv').config()

const configEnv = {
    serverPort: process.env.SERVER_PORT, 
    authPort: process.env.AUTH_PORT, 
    accessToken: process.env.ACCESS_TOKEN_SECRET_KEY, 
    refreshToken: process.env.REFRESH_TOKEN_SECRET_KEY, 
}

module.exports = configEnv
