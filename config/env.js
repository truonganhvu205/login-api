require('dotenv').config()

const env = {
    portServer: process.env.PORT_SERVER,
    portAuth: process.env.PORT_AUTH,
    accessToken: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshToken: process.env.REFRESH_TOKEN_SECRET_KEY,
}

module.exports = env
