const pool = require("../database");

const createUser = async (name, email, password) => {

  return await pool.query("INSERT INTO users SET ?", {
    name,
    email,
    password
  });
}

const findUser = async (email) => {

  return await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`); 
}

module.exports = {
  createUser,
  findUser,
}