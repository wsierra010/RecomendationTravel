const pool = require("../database");

const createRecomendation = async (title, category, city, header, description, photo, uid) => {

  return await pool.query("INSERT INTO recomendation SET ?", {
    title,
    category,
    city,
    header,
    description,
    photo,
    user_id: uid,
    });
}

const findVotedRecomendation = async (uid, recomendationId) => {

  return await pool.query(`SELECT * FROM vote_recomendation WHERE userid = ${uid} AND recomendation_id = ${recomendationId}`);

}

const getVoteRecomendation = async (uid, recomendationId) => {

  return await pool.query("INSERT INTO vote_recomendation SET ?", {
    recomendation_id: recomendationId,
    userid: uid,
  })
}

const deleteVoteRecomendation = async (uid, recomendationId) => {

  return await pool.query(`DELETE FROM vote_recomendation WHERE userid = ${uid} AND recomendation_id = ${recomendationId}`);

}

const getDescription = async (id) => {

  return await pool.query(`SELECT * FROM recomendation WHERE id = ${id}`);

}

const getRecomendationByCategory = async (category) => {

  return pool.query(`SELECT * FROM recomendation WHERE category = '${category}'`);
}

const getRecomendationByCity = async (city) => {

  return pool.query(`SELECT * FROM recomendation WHERE city = '${city}'`);
}

module.exports = {
  createRecomendation,
  findVotedRecomendation,
  getVoteRecomendation,
  deleteVoteRecomendation,
  getDescription,
  getRecomendationByCity,
  getRecomendationByCategory,
}