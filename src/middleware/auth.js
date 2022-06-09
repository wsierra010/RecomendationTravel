const helpers = require("../lib/helpers");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await helpers.verifyToken(token);
    // console.log(tokenData);
    if (tokenData.id) {
      next();
    } else {
      res.status(409);
      res.send({ error: "No tienes autorizacion" });
    }
  } catch (error) {
    console.log(error);
    res.status(409);
    res.send({ error: "No tienes autorizacion" });
  }
};

module.exports = checkAuth;
