function validateLoginInput(req, res, next) {
    const {username, password} = req.body
    if(!username?.trim() || !password?.trim()) {
        return res.sendStatus(400)
    }

    next()
}

module.exports = validateLoginInput
