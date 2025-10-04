const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const jwt = require('jsonwebtoken')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

let refreshTokens = []

app.post('/login', (req, res) => {
  const username = req.body.username

  const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
  const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET)

  refreshTokens.push(refreshToken)

  res.json({accessToken, refreshToken})
})

app.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.token

    if(!refreshToken) {
        res.sendStatus(401)
        return
    }

    if(!refreshTokens.includes(refreshToken)) {
        res.sendStatus(403)
        return
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if(err) {
                res.sendStatus(403)
                return
            } else {
                const accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
                
                res.json({accessToken})
            }
        })
    }
})

app.post('/logout', (req, res) => {
    const refreshToken = req.body.token

    refreshTokens = refreshTokens.filter(refToken => refToken !== refreshToken)
    res.sendStatus(200)
})

app.listen(port)
