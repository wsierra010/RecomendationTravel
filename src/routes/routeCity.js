const express = require("express");
const router = express.Router();

const pool = require("../database");
const { categoryTravel } = require("../controller/getCategory");

router.post("/city");
router.get("/city", (req, res, next) => {
  res.send("Mostrar lugares");
});

module.exports = router;
