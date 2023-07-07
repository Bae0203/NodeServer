const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SignUp, SignIn, GetName, IdCheck } = require("../controller/auth");

authRoutes.post("/signin", async function (req, res) {
  const { id, password } = req.body;
  if (SignIn({ id: id, password: password })) {
    const name = GetName({ id: id });
    const token = jwt.sign({ id, name }, "your_secret_key");
    res.json({ token });
  } else {
    res.send({ message: "계정이 존재하지 않거나 정보가 틀렸습니다." });
  }
});

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
