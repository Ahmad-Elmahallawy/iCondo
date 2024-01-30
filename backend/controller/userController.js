const jwt = require('jsonwebtoken')
const bcrypt = require('bryptjs')
const asyncHandler = require('express-async-handler');
const prisma = require('../index')

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    })
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
        where: { email },
    })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        })

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
            role: user.role,
        })
    } catch (error) {
        console.error(error)
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUserByEmail = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

module.exports = {
    registerUser,
    getUserByEmail
}
