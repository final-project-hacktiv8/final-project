const MachineModel = require('../models/mRasp');

module.exports = (req,res,next) => {
    const owner = req.decode.id
    const { id } = req.params
    MachineModel.findById(id)
    .then(data => {
        if (owner == data.owner){
            next()
        } else {
            let err = {
                statusCode: 401,
                message: 'action fail'
            }
            next(err)
        }
    })
    .catch(next)
}