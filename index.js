const express = require('express')
const app = express()
const port = 3000
const authMiddleware = require('./middlewares/AuthMiddleware')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const people = [
    {
        id: 1,
        name: 'user1',
    }, {
        id: 2,
        name: 'user2',
    }, {
        id: 3,
        name: 'user3',
    }, {
        id: 4,
        name: 'user4',
    }, {
        id: 5,
        name: 'user5',
    }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/people', authMiddleware, (req, res) => {
  res.json(people)
})

app.listen(port)
