const ModelUser = require('../models/mUser');
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken }  = require('../helpers/jwt')

class UserController {
    static signIn(req,res,next){
        let err = {
            statusCode: 400,
            message : "Email / Password not found"
        }
        const { email, password} = req.body;
        ModelUser.findOne({email})
        .then(data => {
            if (data){
                if (verifyPassword(password, data.password))
                {
                    const token = createToken(data)
                    res.status(200).send({token, data})
                } else {
                    next(err)
                }
            } else {
                next(err)
            }
        })
        .catch(next)
    }

    static signUp(req,res,next){
        const { fullname, email, password } = req.body
        ModelUser.create({fullname,email, password})
        .then(data => {
            const token = createToken(data)
            res.status(201).send({token, data})
        })
        .catch(next)
    }

    static changePhoto(req,res,next){
        const { id } = req.decode;
        const photo_path = req.file.cloudStoragePublicUrl;
        ModelUser.findByIdAndUpdate(id, {photo_path}, {new: true})
        .then(data => {
            res.status(200).send(data)
        })
        .catch(next)
    }
}

module.exports = UserController