const express = require("express");
const router = express.Router();

const pool = require("../database");
const { createRecomendation, voteRecomendation, getDetailRecomendation, city, category} = require("../controller/recomdsController");
const checkAuth = require("../middleware/auth");

router.post("/create", checkAuth, createRecomendation);

router.post("/like/:id", checkAuth, voteRecomendation);

router.get("/find/:city", city);

router.get("/find/:category", category);

router.get("/:id", getDetailRecomendation);


router.get("/", (req, res, next) => {
  res.send("Hello World");
});

module.exports = router;
