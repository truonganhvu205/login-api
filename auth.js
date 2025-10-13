const express = require('express')
const app = express()
const {portAuth} = require('./config')
const {
    hashPass, 
    comparePass, 
    generateAccessKey, 
    generateRefreshKey, 
    verifyRefreshKey
} = require('./utils')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

let users = []
let refreshTokens = []

app.post('/register', (req, res) => {
    const {username, password} = req.body
    let user = users.find(user => user.username === username)

    if(user) {
        return res.sendStatus(401)
    }

    const hash = hashPass(password)

    user = {username, password: hash}
    users.push(user)

    return res.sendStatus(200)
})

app.get('/register-get', (req, res) => {
    return res.json(users)
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.sendStatus(400)
    }
    
    const user = users.find(user => user.username === username)
    if(!user) {
        return res.sendStatus(401)
    }
    
    if(comparePass(password, user.password)) {
        const accessToken = generateAccessKey(user.username)
        const refreshToken = generateRefreshKey(user.username)
        refreshTokens.push(refreshToken)
        
        return res.json({accessToken, refreshToken})
    } else {
        return res.sendStatus(403)
    }
})

app.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.token

    if(!refreshToken) {
        return res.sendStatus(401)
    }

    if(!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }

    try {
        const newAccessToken = await verifyRefreshKey(refreshToken)
        
        return res.json({newAccessToken})
    } catch(err) {
        return res.status(403).json({message: err})
    }
})

app.post('/logout', (req, res) => {
    const token = req.body.token

    refreshTokens = refreshTokens.filter(refreshToken => refreshToken !== token)
    
    return res.sendStatus(200)
})

app.listen(portAuth)
