const helpers = require("../lib/helpers");

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('');
    }
    
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await helpers.verifyToken(token);
    req.auth = tokenData;
    next();
  } catch (error) {
    console.log(error);
    res.status(409);
    res.send({ error: "No tienes autorizacion" });
  }
};

module.exports = checkAuth;
