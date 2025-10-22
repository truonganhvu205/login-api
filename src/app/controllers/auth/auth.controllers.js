const {usersDb, refreshTokensDb} = require('../../databases')
const {
    hashPass,
    generateAccessKey,
    generateRefreshKey,
} = require('../../utils')

class AuthController {
    // POST /user/register
    userRegister(req, res) {
        const {username, password, role = 1} = req.body
        const hash = hashPass(password)

        const user = {username, password: hash, role: role}
        usersDb.push(user)

        return res.sendStatus(201)
    }

    // GET /user/register-get
    // userRegisterGet(req, res) {
    //     return res.json(usersDb)
    // }

    // POST /user/login
    userLogin(req, res) {
        const user = req.user
        const accessToken = generateAccessKey(
            {
                username: user.username,
                role: user.role,
            }
        )
        const refreshToken = generateRefreshKey(
            {
                username: user.username,
                role: user.role,
            }
        )

        refreshTokensDb.push(refreshToken)
        return res.json({accessToken, refreshToken})
    }

    // POST /user/refresh-token
    async userRefreshToken(req, res) {
        try{
            const user = req.user
            if(!user || !user.username) {
                return res.sendStatus(403)
            }

            const accessToken = generateAccessKey(
                {
                    username: user.username,
                    role: user.role,
                }
            )
            return res.json({accessToken})
        } catch(err) {
            return res.sendStatus(500)
        }
    }

    // POST /user/logout
    userLogout(req, res) {
        const refreshToken = req.body.token
        const index = refreshTokensDb.indexOf(refreshToken)

        if(index !== -1) {
            refreshTokensDb.splice(index, 1)
        }

        return res.sendStatus(200)
    }
}

module.exports = new AuthController()
