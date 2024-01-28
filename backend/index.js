const express = require("express");
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000;
const path = require('path');

const app = express()
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

