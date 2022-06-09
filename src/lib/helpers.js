const bcrypt = require('bcryptjs');

const helpers = {};


helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.validatePassword = function (passwordHash, password) {
    return bcrypt.compare(passwordHash, password)
};

module.exports = helpers;
