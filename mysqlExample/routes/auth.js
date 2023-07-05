const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
authRoutes.post("/signin", function (req, res) {});

module.exports = authRoutes;
