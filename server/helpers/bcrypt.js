const bcrypt = require('bcryptjs')

const round = process.env.SALT_ROUND

const salt = bcrypt.genSaltSync(Number(round))

function createPassword(password){
    return bcrypt.hashSync(password,salt)
}

function verifyPassword(password,hashPassword){
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = { createPassword, verifyPassword}