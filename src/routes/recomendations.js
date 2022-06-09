const express = require("express");
const router = express.Router();

const pool = require("../database");
const { createRecomendation } = require("../controller/recomdsController");
const checkAuth = require("../middleware/auth");

router.post("/create", checkAuth, createRecomendation);

router.get("/", (req, res, next) => {
  res.send("Hello World");
});

module.exports = router;
