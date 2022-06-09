const pool = require("../database");
const helpers = require("../lib/helpers");

const createRecomendation = async (req, res, next) => {
  const { title, category, city, header, description, photo } = req.body;
  const token = req.headers.authorization.split(" ").pop();
  const tokenData = await helpers.verifyToken(token);

  await pool.query("INSERT INTO recomendation SET ?", {
    title,
    category,
    city,
    header,
    description,
    photo,
    user_id: tokenData.id,
  });
  res.send("Added recommendation");
};

module.exports = {
  createRecomendation,
};
