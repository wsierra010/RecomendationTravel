require('dotenv').config();

module.exports = {
  database: {
    connectionLimit: 10,
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWD_DATABASE,
    database: process.env.NAMEDB_DATABASE,
  },
};
