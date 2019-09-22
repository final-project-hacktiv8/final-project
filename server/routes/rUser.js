const router = require('express').Router();
const UserController = require('../controllers/cUser');
const authToken = require('../helpers/auhtToken');
const decoderImage = require('../helpers/decoderImage');
const { uploadFile } = require('../helpers/gcs')

router.post('/signup', UserController.signUp, UserController.signIn)
router.post('/signin', UserController.signIn)
router.post('/changephoto', authToken, decoderImage, uploadFile, UserController.changePhoto)

module.exports = router