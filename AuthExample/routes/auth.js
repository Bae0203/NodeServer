const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

authRoutes.post("/signin", async function (req, res) {});

authRoutes.post("/signup", async function (req, res) {});

authRoutes.post("/signup/usercheck", async function (req, res) {});

module.exports = authRoutes;
