const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { createPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please fill email path'],
        unique: [true, 'email already used'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password : {
        type : String,
        required: [true, 'Please fill password path']
    },
    fullname : {
        type: String, 
        required: [true, 'Please fill fullname path']
    },
    photo_path : {
        type: String,
    }
})

userSchema.pre('save', function(){
    this.password = createPassword(this.password)
    this.photo_path = "https://www.teatro.it/old/2016-11/nobody_m.original.jpg"
})

const ModelUser = mongoose.model('User', userSchema)

module.exports = ModelUser