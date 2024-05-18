const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
const UsersSchema = new Schema(
  {
    username: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
      enum: [true, false],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save hook to hash the password
UsersSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    const hash = await bcrypt.hash(user.password, salt);
    // Replace the plain-text password with the hashed one
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UsersSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UsersSchema);
module.exports = { User };
