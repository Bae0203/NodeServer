const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SignUp, SignIn, IdCheck } = require("../controller/auth");

authRoutes.post("/signup", async function (req, res) {
  const { name, id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  SignUp({ id: id, password: hashedPassword, name: name });

  const token = jwt.sign({ id, name }, "your_secret_key");

  res.json({ token });
});

authRoutes.post("/signup/idcheck", async function (req, res) {
  const { id } = req.body;
  IdCheck({ id: id, res: res });
});

module.exports = authRoutes;
