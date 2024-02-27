const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  login,
  consoleLog,
  getUser,
  modifyUser,
  registerEmployee,
  registerAdminCompany,
  resetPassword
} = require("../controller/userController");

router.route("/").post(registerUser).patch(resetPassword);
router.route('/adminCompanyCreation').post(registerAdminCompany)
router.route("/login").get(login);
router.route("/:userid").get(getUser);
router.route("/register/employee").post(registerEmployee);
module.exports = router;
