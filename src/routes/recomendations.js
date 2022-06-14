const express = require("express");
const router = express.Router();

const { newRecomendation, voteRecomendation, getDetailRecomendation, searchRecomendations} = require("../controller/recomdsController");
const checkAuth = require("../middleware/auth");

router.post("/create", checkAuth, newRecomendation);

router.post("/like/:id", checkAuth, voteRecomendation);

router.get("/find/", searchRecomendations);

router.get("/:id", getDetailRecomendation);


module.exports = router;
