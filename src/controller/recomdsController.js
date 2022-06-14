const { 
  createRecomendation, 
  findVotedRecomendation, 
  getVoteRecomendation, 
  deleteVoteRecomendation, 
  getDescription, 
  getRecomendationByCategory, 
  getRecomendationByCity} = require("../services/recomendation-service");


const newRecomendation = async (req, res, next) => {
  const { title, category, city, header, description, photo } = req.body;

  if (!(title && category && city && header && description && photo)) {
    const error = new Error("You need to fill in all the fields");
    error.statusCode = 404;
    throw error;
  }

  if (!req.auth.id) {
    const error = new Error("you don't have authorization");
    error.statusCode = 401;
    throw error;
  }

  await createRecomendation(title, category, city, header, description, photo, req.auth.id);

  res.status(201)
  .send("Added recommendation");
};

const voteRecomendation = async (req, res, next) => {
  
  const findVoteRecomds = await findVotedRecomendation(req.auth.id, req.params.id);

  if (!req.auth.id) {
    const error = new Error("you don't have authorization");
    error.statusCode = 401;
    throw error;
  }
  
  if (findVoteRecomds.length === 0) {
    await getVoteRecomendation(req.auth.id, req.params.id);
    res.send('Hecho');

  } else {
    await deleteVoteRecomendation(req.auth.id, req.params.id)
    res.send('Eliminado');
  }
};

const getDetailRecomendation = async (req, res, next) => {
  const {id} = req.params;

  const recomendation = await getDescription(id);

  res.send(recomendation);
}

const searchRecomendations = async (req, res, next) => {
  const {city, category} = req.query;

  if (category) {
    const getByCategory = await getRecomendationByCategory(category);
    res.send(getByCategory);
  }
  if (city) {
    const getByCity = await getRecomendationByCity(city);
    res.send(getByCity)
  }
}


module.exports = {
  newRecomendation,
  voteRecomendation,
  getDetailRecomendation,
  searchRecomendations,
};
