const Storage = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.BUCKET_NAME;

const storage = new Storage.Storage({
    keyFilename: 'keyfile.json'
})

const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const uploadFile = (req,res,next) => {
    let err = {}
    if (!req.file.mimetype.includes('image')){
        err.statusCode(400)
        err.message('Only Image Allowed')
        next(err)
    }
    
      const gcsname = req.file.originalname
      const file = bucket.file(gcsname)
    
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      })
    
      stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
      })
    
      stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        delete req.file.buffer
        file.makePublic().then(() => {
          req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
          next()
        })
      })
    
      stream.end(req.file.buffer)
}

module.exports = {
    uploadFile,
}