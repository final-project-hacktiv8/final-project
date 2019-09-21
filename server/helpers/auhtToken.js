const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        var decoded = verifyToken(req.headers.token)
        req.decode = decoded;
        next()
    } catch (err) {
        err.statusCode = 401
        err.message = "Token Not match"
        next(err)
    }
}