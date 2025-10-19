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

class SiteController {
    // GET /
    index(req, res) {
        res.send('Hello World!')
    }

    // GET /people
    showList(req, res) {
        res.json(people)
    }
}

module.exports = new SiteController()
