const express = require("express");
const router = express.Router();

const pool = require("../database");
const { signUp, signIn } = require("../controller/authController");

router.post("/signup", signUp);

router.post("/signin", signIn);

module.exports = router;
