const router = require('express').Router();
const ControllerToken = require('../controllers/cToken')

router.post('/add', ControllerToken.addToken )
router.post('/send', ControllerToken.sendNotification)

module.exports = router