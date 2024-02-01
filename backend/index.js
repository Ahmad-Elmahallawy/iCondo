const express = require("express");
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8000;
const path = require('path');
const {errorHandler} = require("./middleware/errorMiddleware");
const app = express()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

app.use(cors({origin:true,credentials: true}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/userRoutes'));
// app.use(errorHandler)
app.get('/', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

// module.exports = {prisma}
app.listen(process.env.PORT, function () {
    console.log('CORS-enabled web server listening on port 80')
})