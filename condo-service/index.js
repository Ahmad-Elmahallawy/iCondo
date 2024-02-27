const express = require("express");
const dotenv = require("dotenv").config({ path: [".env.local", ".env"] });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8001;
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/files', require('./routes/fileRoutes'));

app.get("/", function (req, res, next) {
    res.json({ msg: "This is CORS-enabled for all origins!" });
});

// module.exports = {prisma}
/*app.listen(process..env.PORT, function () {
  console.log("CORS-enabled web server listening on port " + process..env.PORT);
});*/
module.exports = {prisma, app}