const { User } = require("../Models/User.js");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const constants = require("../config/constants.js");
const {handleValidationError, emptyPrevErrorMessages} = require("../utils/processDbError.js");

const registerUser = async (userData, constants) => {
  let userExisting = await checkIfUserExists(userData.email);
  if (!userExisting) {
    try {
      let hash = await bcryptjs.hash(userData.password, constants.SALT_ROUNDS);
      userData.password = hash;
      let newUser = await User.create({
        ...userData,
      });
      return createSession(newUser.username, newUser.email, newUser._id);
    } catch (err) {
      let errMessages = handleValidationError(err);
      throw { messages: errMessages };
    }
  } else {
    emptyPrevErrorMessages()
    let errMessages = handleValidationError("Email is not available!");
    throw { messages: errMessages };
  }
};

const loginUser = async (userData) => {
  let user = await User.findOne({ email: userData.email });

  if (user) {
    try {
      let isPassCorrect = await bcryptjs.compare(
        userData.password,
        user.password
      );
      if (isPassCorrect) {
        return createSession(user.username, user.email, user._id);
      } else {
        emptyPrevErrorMessages()
        let errMessages = handleValidationError("Email and/or password is incorrect!");
        throw { messages: errMessages };
      }
    } catch (err) {
      let errMessages = handleValidationError(err);
      throw { messages: errMessages };
    }
  } else {
    emptyPrevErrorMessages()
    let errMessages = handleValidationError("Email and/or password is incorrect!");
    throw { messages: errMessages };
  }
};

const getUsers = async () => {
  try {
    let users = await User.find({}).populate("desks");
    return users;
  } catch (err) {
    let errMessages = handleValidationError(err);
    throw { messages: errMessages };
  }
};

const checkIfUserExists = (email) => User.exists({ email }).exec();

const createSession = (username, email, id) => {
  const payload = {
    username,
    email,
    id,
  };
  let accessToken = jsonwebtoken.sign(payload, constants.JWT_SECRET);
  return {
    username,
    email,
    id,
    accessToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
