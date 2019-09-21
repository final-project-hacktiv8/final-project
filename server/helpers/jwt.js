const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

function createToken(input){
    const {id,email} = input
    return jwt.sign({id,email},secret)
}

function verifyToken(token){
    return jwt.verify(token,secret)
}

module.exports = {createToken, verifyToken}