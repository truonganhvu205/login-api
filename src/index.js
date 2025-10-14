const express = require('express')
const app = express()
const {serverPort} = require('./app/configs')
const {authUser} = require('./app/middlewares')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const people = [
    {
        id: 1,
        name: 'user1',
    }, 
    {
        id: 2,
        name: 'user2',
    }, 
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/people', authUser, (req, res) => {
  res.json(people)
})

app.listen(serverPort)
