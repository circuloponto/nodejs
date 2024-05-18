const express = require("express");
const router = express.Router();


const {
  userSignup,
  updateUser,
  deleteUserById,
  deleteUserByEmail,
  findOneUserByEmail,
  findOneUserById,
  updateEmailById,
  updateEmailByEmail,
  findAllUsers } = require("../controllers/Users.controller");

router.post("/signup-user", userSignup)
router.post("/update-user", updateUser)
router.post("/delete-user-by-id", deleteUserById)
router.post("/delete-user-by-email", deleteUserByEmail)
router.post("/find-one-user-by-id", findOneUserById)
router.post("/find-one-user-by-email", findOneUserByEmail)
router.post("/update-email-by-id", updateEmailById)
router.post("/update-email-by-email", updateEmailByEmail)
router.post("/find-all-users", findAllUsers)

module.exports = router;