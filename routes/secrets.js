var express = require('express')
var router = express.Router()
const UserCtrl = require('../controllers/UserCtrl.js')
/* GET users listing. */
router.post('/', UserCtrl.create)
router.get('/:uid', UserCtrl.retrieve)

module.exports = router
