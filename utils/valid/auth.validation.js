const { check } = require("express-validator");

exports.isValidUserLogin = [
  check("email", "Email is required").notEmpty().withMessage("Email can't be empty"),
  check("password", "Password is required").notEmpty().withMessage("Password can't be empty"),
];
