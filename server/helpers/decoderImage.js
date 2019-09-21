module.exports = (req,res,next) => {
    const { photo } = req.body;
    const { id } = req.decode;
    try { 
        const type = photo.split(';')[0].split('/')[1];
        const mime = photo.split(';')[0].split('/')[0].split(':')[1];
        let buff = Buffer.from(photo.split('base64,')[1], "base64")
        delete req.body.photo
        req.file = {
            buffer: buff,
            originalname: id+"."+type,
            mimetype: mime+"/"+type
        }
        next()
    } catch (err) {
        let error = {
            statusCode : 400, 
            message : 'Image must be encoded base64'
        }
        next(error)
    }
    
}