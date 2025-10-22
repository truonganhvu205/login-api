function authRole(role) {
    return (req, res, next) => {
        if(req.user.role !== role) {
            return res.sendStatus(403)
        }

        next()
    }
}

module.exports = authRole
