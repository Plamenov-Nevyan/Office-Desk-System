const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Email is required for registration!"],
    minLength: [3, "Username must be atleast 3 characters long!"],
    maxLength: [10, "Username can't be longer than 10 characters!"],
    match: [
      /^[A-Za-z0-9]+$/,
      "Username can only consist of letters and numbers!",
    ],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required for registration!"],
    minLength: [4, "Email must be atleast 4 characters long!"],
    maxLength: [20, "Email can't be longer than 20 characters!"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  password: {
    type: String,
    trim: true,
    required: [true, "Password is required for registration!"],
    minLength: [6, "Password must be atleast 6 characters long!"],
  },

  desks: [
    {
      type: Types.ObjectId,
      ref: "Desk",
    },
  ],
});

const User = model("User", userSchema);

exports.User = User;
