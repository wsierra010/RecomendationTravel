const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const helpers = require("../lib/helpers");
const { createUser, findUser } = require("../services/user-service");



const   signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const passHash = await bcrypt.hash(password, 10);

  const getUser = await findUser(email);
  console.log(getUser);

  try {
    if (getUser.length === 1) {
      res.status(304)
      .send('User already Registered!')
    }

    if (!(name && email && password)) {
      const error = new Error("User email, password and avatar are required");
      error.statusCode = 400;
      throw error;
    }

    await createUser(name, email, passHash);
    res.status(201).send({
      status: "Ok",
      message: "Successfully registered user",
    });
    
  } catch (err) {
    next(err);
  }

};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 404;
      throw error;
    }
    
    const fetchUser = await findUser(email);
    console.log(fetchUser[0].email,'email');

    if (fetchUser[0].email != email) {
      const error = new Error("Email doesn't exist!");
      error.statusCode = 404;
      throw error;
    }
    
    const findPass = fetchUser[0].password;
    const validPassword = await helpers.validatePassword(password, findPass);

    if (validPassword === false) {
      const error = new Error("Incorrect password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: fetchUser[0].id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200)
    .json({
      auth: true,
      token,
    });
    
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
