const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {registerUser, login, consoleLog, registerCompany, getUser} = require('../controller/userController')

router.route('/')
    .post(registerUser)
router.route('/login')
    .get(login)
router.route('/registerCompany')
    .post(registerCompany)
router.route('/:userid')
    .get(getUser)

module.exports = router