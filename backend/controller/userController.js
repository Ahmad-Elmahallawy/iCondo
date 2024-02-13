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
  if (first_name == null || last_name == null || email == null || password == null || role == null || username == null || phone_number == null) {
    return res.status(400).json({ error: "Please add all fields" });
  }
  // Check if user exists
  const userExists = await prisma.User.findUnique({
    where: { email },
  });
  const roleRecord = await prisma.Role.findFirst({
    where: { name: role },
  });
  if (!roleRecord) {
    return res.status(400).json({ error: "Invalid role specified" })
  }
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
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
    return res.status(400).json({ error: "Invalid user data" });
  }
});

//companyAdmin
const registerAdminCompany = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    phone_number,
    company_name,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !username ||
    !company_name
  ) {
    return res.status(400).json({error:"Please add all fields"})
  }
  // Check if user exists
  const userExists = await prisma.User.findUnique({
    where: { email },
  });
  const roleRecord = await prisma.Role.findFirst({
    where: { name: "Admin" },
  });
  if (userExists) {
    res.status(400);
    return res.status(400).json({error:"User already exists"})
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = await prisma.User.create({
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
    const newCompany = await prisma.Company.create({
      data: {
        name: company_name,
      },
    });
    const adminCompanyRelation = await prisma.Company_employee.create({
      data: {
        user_id: newUser.id,
        company_id: newCompany.id,
      },
    });

    res.status(201).json({
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      email: newUser.email,
      phone_number: newUser.phone_number,
      token: generateToken(newUser.id),
      role: roleRecord.name,
      company_name: newCompany.name,
    });
  } catch (error) {
    console.error(error);
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Please add all fields" });
  }

  const user = await prisma.User.findUnique({
    where: { email },
  });

  const roleRecord = await prisma.Role.findUnique({
    where: { id: user.role_id },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
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
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const user = await prisma.User.findFirst({
    where: { id: parseInt(userid) },
  });
  if (!user) {
    return res.status(400).json({ error: 'User doesn\'t exist' });
  }
  const roleRecord = await prisma.Role.findUnique({
    where: { id: user.role_id },
  });

  res.status(201).json({
    _id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    phone_number: user.phone_number,
    role: roleRecord.name,
  });
});

const modifyUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(_id) },
  });

  if (!user) {
    return res.status(400).json({ error: "User doesn't exist" });
  }

  if (await doesNewUserExist("email", req.body.email, user.email)) {
    return res.status(400).json({ error: "User with new email already exists" });
  }

  if (await doesNewUserExist("username", req.body.username, user.username)) {
    return res.status(400).json({ error: "User with new username already exists" });
  }

  if (await doesNewUserExist("phone_number", req.body.phone_number,user.phone_number)) {
    return res.status(400).json({ error: "User with new phone number already exists" });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword || user.password;
  }
  user.first_name = req.body.first_name || user.first_name;
  user.last_name = req.body.last_name || user.last_name;
  user.email = req.body.email || user.email;
  user.username = req.body.username || user.username;
  user.phone_number = req.body.phone_number || user.phone_number;

  const updatedUser = await prisma.User.update({
    where: {
      id: parseInt(_id),
    },
    data: user,
  });
  res.status(201).json(updatedUser);
});

const doesNewUserExist = asyncHandler(async (name, newValue, currentValue) => {
  if (!newValue || newValue === currentValue) return false;

  const newUser = await prisma.User.findUnique({
    where: { [name]: newValue },
  });
  return !!newUser;
});

const registerEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      phone_number,
      company_name,
      password,
    } = req.body;

    // Check if the company exists
    const existingCompany = await prisma.company.findFirst({
      where: { name: company_name },
    });
    if (!existingCompany) {
      return res.status(400).json({ error: "Company does not exist" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email is already taken
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Get the role ID based on the role name
    const roleRecord = await prisma.Role.findFirst({
      where: { name: "FinanceManager" }, // Update with the correct role name
    });

    if (!roleRecord) {
      return res.status(400).json({ error: "Role not found" });
    }

    // Create a new user (employee)
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        username,
        phone_number,
        password: hashedPassword,
        role: { connect: { id: roleRecord.id } }, // Provide the role ID
        company_employees: {
          create: {
            company: {
              connect: {
                id: existingCompany.id,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      role: roleRecord.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  registerUser,
  login,
  getUser,
  modifyUser,
  registerAdminCompany,
  registerEmployee,
};
