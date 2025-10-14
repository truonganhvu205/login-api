const express = require('express')
const app = express()
const {authPort} = require('./app/configs')
const {usersDb, refreshTokensDb} = require('./app/databases')
const {
    validateLoginInput, 
    verifyUserLogin, 
    validateRegisterInput, 
    verifyUserRegister, 
    verifyRefreshToken, 
} = require('./app/middlewares')
const {
    hashPass, 
    generateAccessKey, 
    generateRefreshKey, 
} = require('./app/utils')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/register', validateRegisterInput, verifyUserRegister, (req, res) => {
    const {username, password} = req.body
    const hash = hashPass(password)

    const user = {username, password: hash}
    usersDb.push(user)

    return res.sendStatus(201)
})

app.get('/register-get', (req, res) => {
    return res.json(usersDb)
})

app.post('/login', validateLoginInput, verifyUserLogin, (req, res) => {
    const user = req.user

    const accessToken = generateAccessKey(user.username)
    const refreshToken = generateRefreshKey(user.username)
    refreshTokensDb.push(refreshToken)
    
    return res.json({accessToken, refreshToken})
})

app.post('/refresh-token', verifyRefreshToken, async(req, res) => {
    try{
        const user = req.user
        if(!user || !user.username) {
            return res.sendStatus(403)
        }

        const accessToken = generateAccessKey(user.username)
        return res.json({accessToken})
    } catch(err) {
        return res.sendStatus(500)
    }
})

app.post('/logout', verifyRefreshToken, (req, res) => {
    const {refreshToken} = req.body
    
    refreshTokensDb = refreshTokensDb.filter(refreshTokenDb => refreshTokenDb !== refreshToken)
    return res.sendStatus(200)
})

app.listen(authPort)
