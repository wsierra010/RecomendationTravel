const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.validatePassword = function (passwordHash, password) {
  return bcrypt.compare(passwordHash, password);
};

helpers.verifyToken = async (token) => {
  try {
    return jwt.verify(token, config.secret);
  } catch (e) {
    return null;
  }
};

module.exports = helpers;
