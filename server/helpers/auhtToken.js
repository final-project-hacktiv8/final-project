const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        var decoded = verifyToken(req.headers.token)
        req.decode = decoded;
        next()
    } catch (err) {
        next(err)
    }
}