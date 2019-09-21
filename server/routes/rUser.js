const router = require('express').Router();
const UserController = require('../controllers/cUser');
const authToken = require('../helpers/auhtToken');

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/changephoto', authToken, UserController.changePhoto )

module.exports = router