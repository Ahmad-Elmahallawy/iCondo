const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
// const prisma = require('../index')
const { PrismaClient } = require("@prisma/client");
const { async } = require("sonarqube-scanner");
const prisma = new PrismaClient();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    role,
    phone_number,
  } = req.body;
  if (!first_name || !last_name || !email || !password || !role || !username) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user exists
  const userExists = await prisma.User.findUnique({
    where: { email },
  });
  const roleRecord = await prisma.Role.findFirst({
    where: { name: role },
  });
  if (!roleRecord) {
    res.status(400);
    throw new Error("Invalid role specified");
  }
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.User.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        username,
        role_id: roleRecord.id,
        phone_number,
      },
    });

    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      token: generateToken(user.id),
      role: roleRecord.name,
    });
  } catch (error) {
    console.error(error);
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await prisma.User.findUnique({
    where: { email },
  });
  const roleRecord = await prisma.Role.findUnique({
    where: { id: user.role_id },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      token: generateToken(user.id),
      role: roleRecord.name,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
    const {userid} = req.params
    const user = await prisma.User.findFirst({
        where: {id: parseInt(userid)},
    })
    const roleRecord = await prisma.Role.findUnique({
        where: {id: user.role_id},
    })

    if (!user) {
        res.status(400)
        throw new Error('User doesn\'t exist')
    }
    res.json({
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        role: roleRecord.name,
    })
})

const modifyUser = asyncHandler(async (req, res) => {
    const {id} = req.body
    const user = await prisma.User.findFirst({
        where: {id: parseInt(id)},
    })

    if (!user) {
        res.status(400)
        throw new Error('User doesn\'t exist')
    }

    if (await doesNewUserExist("email", req.body.email, user.email)) {
        res.status(400)
        throw new Error('User with new email already exists')
    }

    if (await doesNewUserExist("username", req.body.username, user.username)) {
        res.status(400)
        throw new Error('User with new username already exists')
    }

    if (await doesNewUserExist("phone_number", req.body.phone_number, user.phone_number)) {
        res.status(400)
        throw new Error('User with new phone number already exists')
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user.password = hashedPassword || user.password;
    }
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.phone_number = req.body.phone_number || user.phone_number;

    const updatedUser = await prisma.User.update({
        where: {
            id: parseInt(id),
        },
        data: user,
    });
    res.json(updatedUser);
})

const doesNewUserExist = asyncHandler(async (name, newValue, currentValue) => {
    if (!newValue || newValue === currentValue) return false

    const newUser = await prisma.User.findUnique({
        where: {[name] : newValue},
    })
    return !!newUser;
})

module.exports = {
    registerUser,
    login,
    getUser,
    modifyUser
}
