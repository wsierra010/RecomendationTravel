const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const pool = require("../database");
const config = require("../config");
const helpers = require("../lib/helpers");

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const passHash = await bcrypt.hash(password, 10);
  console.log(passHash);

  await pool.query("INSERT INTO users SET ?", {
    name,
    email,
    password: passHash,
  });
  res.send("Registered User");
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const findUser = await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const findPass = findUser[0].password;
  console.log(findUser);
  console.log(findPass);

  if (!findUser) {
    return res.status(404).send("The email doesn't exist");
  }

  const validPassword = await helpers.validatePassword(password, findPass);

  if (!validPassword) {
    return res.status(401).json({
      auth: false,
      token: null,
    });
  }

  const token = jwt.sign({ id: findUser[0].id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({
    auth: true,
    token,
  });
};

module.exports = {
  signUp,
  signIn,
};
