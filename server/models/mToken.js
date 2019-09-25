const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    fullname : {
        type: String,
        required: [true, 'Please fill fulname path']
    },
    expo_token : {
        type: String,
        required: [true, 'Please fill token path']
    }
})

const ModelToken = mongoose.model('Token', tokenSchema);
module.exports = ModelToken;