const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {registerUser, login, consoleLog, getUser, modifyUser} = require('../controller/userController')

router.route('/')
    .post(registerUser)
router.route('/login')
    .get(login)
router.route('/:userid')
    .get(getUser)
router.route('/')
    .patch(modifyUser)

module.exports = router