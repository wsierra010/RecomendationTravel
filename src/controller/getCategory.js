const pool = require("../database");
const helpers = require("../lib/helpers");

const getCategory = async (req, res, next) => {
  const { id } = req.body;
  try {
    let [valido] = await pool.query(
      " SELECT id FROM recomendation WHERE id=? ",
      [id]
    );
    res.send("Get Category");

    if (valido.length === 0) {
      const error = new Error("No tenemos esa categoria id");
      error.httpStatus = 404;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getCategory,
};
