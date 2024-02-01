const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
// const prisma = require('../index')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    })
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, first_name, last_name, email, password, role, phone_number } = req.body
    console.log(username,first_name, last_name, email, password, role)
    if (!username||!first_name || !last_name || !email || !password || !role) {
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
        const user = await prisma.User.create({
            data: {
                username,
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role,
                phone_number
            },
        })

        res.status(201).json({
            _id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            token: generateToken(user.id),
            role: user.role,
        })
    } catch (error) {
        console.error(error)
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const login = asyncHandler(async (req, res) => {
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
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            token: generateToken(user.id),
            role: user.role,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})
//Task 51
const registerCompany = asyncHandler(async (req, res) => {
    const { companyName} = req.body
    console.log(companyName)
    if (!companyName) {
        res.status(400)
        throw new Error('Please provide a company name')
    }
    // Check if user exists
    const companyExists = await prisma.company.findUnique({
        where: {companyName},
    })
    if (companyExists) {
        res.status(400)
        throw new Error(' company name already taken')
    }
})


module.exports = {
    registerUser,
    login,
    registerCompany,
}
