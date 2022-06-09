const express = require("express");
const router = express.Router();

const pool = require("../database");
const { categoryTravel } = require("../controller/getCategory");

router.post("/category");
router.get("/category", (req, res, next) => {
  res.send("Mostrar categorias");
});

module.exports = router;
