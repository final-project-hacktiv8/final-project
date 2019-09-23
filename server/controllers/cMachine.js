const MachineModel = require('../models/mRasp');

class MachineController {
    static add(req,res,next){
        const { id } = req.decode;
        const { machineId } = req.body;
        MachineModel.create({owner: id, machineId})
        .then(data => {
            res.status(201).send(data)
        })
        .catch(next)
    }

    static get(req,res,next){
        const { id } = req.decode;
        MachineModel.find({owner: id})
        .then(data => {
            res.status(200).send({data})
        })
        .catch(next)
    }
    
    static delete(req,res,next){
        const { id } = req.params
        MachineModel.findByIdAndDelete(id)
        .then(data => {
            res.status(200).send({_id: id, message:"Successfully delete"})
        })
    }
}

module.exports = MachineController