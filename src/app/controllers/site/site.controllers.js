const {users} = require('../../databases')

class SiteController {
    // GET /
    index(req, res) {
        res.send('Hello World!')
    }

    // GET /people
    showList(req, res) {
        res.json(users)
    }
}

module.exports = new SiteController()
