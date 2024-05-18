
const { User } = require('../models/users.model');



exports.userSignup = async (req, res) => {
  try {


    const data = {
      username: "nano",
      email: "email@gmail.com"
    }
    const saveuser = await User.create(data);
    if (!saveuser) {
      return res.status(400).json({
        message: "Couldn't create the user",
        status: 400
      })
    }

    return res.status(200).json({
      message: "user is created",
      status: 200,
      data: saveuser
    })
  } catch (error) {
    console.log("🚀 ~ exports.userSignup=async ~ error:", error)
    return res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id, name } = req.body;
    const findUser = await User.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: { username: name } }, { new: true });
    return res.send(findUser)
  } catch (error) {
    console.log("🚀 ~ exports.updateUser= ~ error:", error)

  }
}

exports.deleteUserById = async (req, res) => {
  try {
    const { id, email } = req.body;
    const deleteUser = await User.deleteOne({ _id: id })
    //const deleteUser = await User.findById()
    return res.send(deleteUser)
  } catch (error) {
    console.log("🚀 ~ exports.deleteUser= ~ error:", error)

  }
}
exports.deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const deleteUser = await User.deleteOne({ email: email })
    return res.send(deleteUser)
  } catch (error) {
    console.log("🚀 ~ exports.deleteUserByEmail= ~ error:", error)

  }
}
exports.findOneUserByEmail = async (req, res) => {
  try {
    const { email } = req.body.email;
    const user = await User.findOne({ email });
    return res.send(user)
  } catch (error) {
    console.log("🚀 ~ exports.findOneUserByEmail= ~ error:", error)

  }
}
exports.findOneUserById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const user = await User.findOne({ id });
    return res.send(user)
  } catch (error) {
    console.log("🚀 ~ exports.findOneUserByEmail= ~ error:", error)

  }
}
exports.updateEmailById = async (req, res) => {
  try {
    const { id, email } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // Filter to find the user by ID
      { email: email }, // Update the email field
      { new: true } // Option to return the updated document
    );
    return res.send(updatedUser)
  } catch (error) {
    console.log("🚀 ~ exports.updateEmailById= ~ error:", error)

  }
}
exports.updateEmailByEmail = async (req, res) => {
  try {
    const { id, email, newEmail } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Filter to find the user by current email
      { email: newEmail }, // Update the email field
      { new: true } // Option to return the updated document
    );

    return res.send(updatedUser)
  } catch (error) {
    console.log("🚀 ~ exports.updateEmailById= ~ error:", error)

  }
}
exports.findAllUsers = async (req, res) => {
  try {

    const users = await User.find();

    return res.send(users)
  } catch (error) {
    console.log("🚀 ~ exports.findAllUsers= ~ error:", error)

  }
}

async function createUser(username, password, email) {
  const newUser = new User({
    username,
    password,
    email
  });

  try {
    const savedUser = await newUser.save();
    console.log('User created successfully:', savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
  }
}
createUser('João', '123456', 'joão@gmail.com');

async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('Authentication failed. User not found.');
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      console.log('Authentication successful');
    } else {
      console.log('Authentication failed. Wrong password.');
    }
  } catch (err) {
    console.error('Error authenticating user:', err);
  }
}

// Example usage
authenticateUser('João', '123456');