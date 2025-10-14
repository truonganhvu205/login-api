function validateRegisterInput(req, res, next) {
    const {username, password} = req.body
    if(!username?.trim() || !password?.trim()) {
        return res.sendStatus(400)
    }

    if(password.length < 6) {
        return res.sendStatus(400)
    }

    next()
}

module.exports = validateRegisterInput
