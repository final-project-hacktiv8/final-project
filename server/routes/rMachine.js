const router = require('express').Router();
const authToken = require('../helpers/auhtToken');
const MachineController = require('../controllers/cMachine');
const authOwner = require('../helpers/authOwner');

router.post('/add', authToken, MachineController.add)
router.get('/', authToken, MachineController.get)
router.delete('/delete/:id', authToken, authOwner, MachineController.delete)

module.exports = router