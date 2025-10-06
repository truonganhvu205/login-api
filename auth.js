const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10

app.use(express.urlencoded({extended: true}))
app.use(express.json())

let users = []
let refreshTokens = []

app.post('/register', async(req, res) => {
    try{
        const username = req.body.username
        const password = req.body.password
        
        const hash = await bcrypt.hashSync(password, saltRounds)
        const user = {username, password: hash}
        users.push(user)

        res.sendStatus(200)
    } catch{
        res.sendStatus(500)
    }
})

app.get('/register-get', (req, res) => {
    res.json(users)
})

app.post('/login', async(req, res) => {
  const user = users.find(user => user.username === req.body.username)

  if(!user) {
    res.sendStatus(400)
    return
  }
  
  try{
    if(await bcrypt.compareSync(req.body.password, user.password)) {
        const accessToken = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
        const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET)

        refreshTokens.push(refreshToken)
        res.json({accessToken, refreshToken})
    } else {
      res.sendStatus(404)
      return
    }
  } catch{
    res.sendStatus(500)
    }
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
    const token = req.body.token

    refreshTokens = refreshTokens.filter(refreshToken => refreshToken !== token)
    res.sendStatus(200)
})

app.listen(port)
