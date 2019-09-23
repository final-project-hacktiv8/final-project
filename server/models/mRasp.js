const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaspSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner cant null']
    },
    machineId: {
        type: String,
        required: [true, 'please fill machine id first']
    }
})

 const ModelRasp = mongoose.model('Rasp',RaspSchema)

 module.exports = ModelRasp