const { User } = require("../models/users.model");
const { Photo } = require("../models/users.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const path = require("path");

/**
 * User signUP function
 * @param {*} req username,email
 * @param {*} res success || error
 * @returns 200 || 400
 */
exports.userSignup = async (req, res) => {
  try {
    const data = {
      email: "pedro@gmail.com",
      password: "123456",
    };
    const saveuser = await User.create(data);
    if (!saveuser) {
      return res.status(400).json({
        message: "Couldn't create the user",
        status: 400,
      });
    }
    return res.status(200).json({
      message: "user is created",
      status: 200,
      data: saveuser,
    });
  } catch (error) {
    console.log("🚀 ~ exports.userSignup=async ~ error:", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      return res.status(403).json({
        success: false,
        status: 403,
        message: errorMessage,
      });
    }
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "User not found with the provided email",
      });
    }
    const passComp = await authenticateUser(password, findUser?.password);
    if (!passComp) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Invalid creditionals",
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "User login successfull",
      data: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, name } = req.body;
    const findUser = await User.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { username: name } },
      { new: true }
    );
    return res.send(findUser);
  } catch (error) {
    console.log("🚀 ~ exports.updateUser= ~ error:", error);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id, useremail } = req.body;
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    //const deleteUser = await User.findById()
    return res.send(deleteUser);
  } catch (error) {
    console.log("🚀 ~ exports.deleteUser= ~ error:", error);
  }
};

exports.deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const deleteUser = await User.deleteOne({ email: email });
    return res.send(deleteUser);
  } catch (error) {
    console.log("🚀 ~ exports.deleteUserByEmail= ~ error:", error);
  }
};

exports.findOneUserByEmail = async (req, res) => {
  try {
    const { email } = req.body.email;
    const user = await User.findOne({ email });
    return res.send(user);
  } catch (error) {
    console.log("🚀 ~ exports.findOneUserByEmail= ~ error:", error);
  }
};

exports.findOneUserById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const user = await User.findById({ _id: id });
    return res.send(user);
  } catch (error) {
    console.log("🚀 ~ exports.findOneUserByEmail= ~ error:", error);
  }
};

exports.updateEmailById = async (req, res) => {
  try {
    const { id, email } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // Filter to find the user by ID
      { email: email }, // Update the email field
      { new: true } // Option to return the updated document
    );
    return res.send(updatedUser);
  } catch (error) {
    console.log("🚀 ~ exports.updateEmailById= ~ error:", error);
  }
};

exports.updateEmailByEmail = async (req, res) => {
  try {
    const { id, email, newEmail, isActive } = req.body;
    const updatedUser = await User.findOneAndUpdate({ _id: id, $and: [{ isActive: true }] });
    // { email: email }, // Filter to find the user by current email
    // { email: newEmail }, // Update the email field
    // { new: true } // Option to return the updated document

    return res.send(updatedUser);
  } catch (error) {
    console.log("🚀 ~ exports.updateEmailById= ~ error:", error);
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.send(users);
  } catch (error) {
    console.log("🚀 ~ exports.findAllUsers= ~ error:", error);
  }
};

async function authenticateUser(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);

    if (isMatch) {
      console.log("Authentication successful");
      return isMatch;
    } else {
      return false;
      console.log("Authentication failed. Wrong password.");
    }
  } catch (err) {
    return false;
    console.error("Error authenticating user:", err);
  }
}

// Example usage
//authenticateUser("João", "123456");

exports.uploadPhoto = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.file;
    let findUser = await User.findOneAndUpdate(
      { _id: userId },
      // { $set: { photo: path.join(__dirname, file.path) } },
      { $set: { photo: file.path } },
      { new: true }
    );

    res.status(200).json({
      message: "File uploaded successfully",
      data: findUser,
    });
  } catch (error) {
    console.log("🚀 ~ exports.uploadPhoto= ~ error:", error);
  }
};
