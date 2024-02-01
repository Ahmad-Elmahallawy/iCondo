const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {registerUser, login, consoleLog, registerCompany} = require('../controller/userController')

router.route('/')
    .post(registerUser)
router.route('/login')
    .get(login)
router.route('/registerCompany')
    .post(registerCompany)

module.exports = router