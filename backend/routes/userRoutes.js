const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {registerUser, getUserByEmail} = require('../controller/userController')

router.route('/')
    .post(registerUser)
router.route('/:email')
    .get(protect, getUserByEmail)

module.exports = router