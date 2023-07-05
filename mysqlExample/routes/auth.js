const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
authRoutes.post("/signup", async function (req, res) {
  const { name, id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign({ id }, "your_secret_key");

  res.json({ token });
});

module.exports = authRoutes;
