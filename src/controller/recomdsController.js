const pool = require("../database");
const helpers = require("../lib/helpers");

const createRecomendation = async (req, res, next) => {
  const { title, category, city, header, description, photo } = req.body;
  

  await pool.query("INSERT INTO recomendation SET ?", {
    title,
    category,
    city,
    header,
    description,
    photo,
    user_id: req.auth.id,
  });
  res.send("Added recommendation");
};

const voteRecomendation = async (req, res, next) => {
  console.log(req.params);
  console.log(req.auth.id);
  const findRecomds = await pool.query(`SELECT * FROM recomendation WHERE id = ${req.params.id}`);
  const findVoteRecomds = await pool.query(`SELECT * FROM vote_recomendation WHERE userid = ${req.auth.id} AND recomendation_id = ${req.params.id}`);
  
  console.log(findVoteRecomds);
  const {id} = req.params
  
  if (findVoteRecomds.length === 0) {
    await pool.query("INSERT INTO vote_recomendation SET ?", {
    recomendation_id: id,
      userid: req.auth.id,
    })
    res.send('Hecho');

  } else {
    await pool.query(`DELETE FROM vote_recomendation WHERE userid = ${req.auth.id} AND recomendation_id = ${req.params.id}`);
    res.send('Eliminado');
  }
  // if (findVoteRecomds) {
  //  next();
  // }

  // if(like === true){
  //   await pool.query("INSERT INTO vote_recomendation SET ?", {
  //     recomendation_id: targetId,
  //     userid: tokenData.id,
  //   })
  //   res.send('Votación hecha');
  // }else if (like === false){
  //   await pool.query(`DELETE FROM vote_recomendation WHERE recomendation_id = ${targetId}`);
  //   res.send('Recomendación Eliminada.');
  // }else {
  //   res.status(404)
  //   res.send('No puedes hacer esta votación')
  // }
};

const getDetailRecomendation = async (req, res, next) => {
  const {id} = req.params;

  const recomendation = await pool.query(`SELECT * FROM recomendation WHERE id = ${id}`)

  res.send(recomendation);
}

const city = async (req, res, next) => {
  console.log(req.query.category);

  const recomendation = await pool.query(`SELECT * FROM recomendation WHERE city = '${req.params.city}'`)
  res.send(recomendation)

}

const category = async (req, res, next) => {
  
  const recomendation = await pool.query(`SELECT * FROM recomendation WHERE category = '${req.params.category}'`)
  res.send(recomendation)

}




module.exports = {
  createRecomendation,
  voteRecomendation,
  getDetailRecomendation,
  city,
  category,
};
