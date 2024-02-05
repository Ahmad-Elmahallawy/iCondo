const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {registerUser, login, consoleLog, getUser, modifyUser, registerAdminCompany} = require('../controller/userController')

router.route('/')
    .post(registerUser)
    .patch(modifyUser)
router.route('/adminCompanyCreation')
    .post(registerAdminCompany)
router.route('/login')
    .get(login)
router.route('/:userid')
    .get(getUser)

module.exports = router