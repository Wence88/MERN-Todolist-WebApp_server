const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "email must be unique"],
      required: [true, "email is required"],
    },
    firstName: { type: String, required: [true, "password is required"] },
    password: { type: String, required: [true, "password is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
