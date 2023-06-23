const mongoose = require("mongoose");
const keyConstants = require("./constants.js");

module.exports = () => mongoose.connect(keyConstants.MONGO_URI);
