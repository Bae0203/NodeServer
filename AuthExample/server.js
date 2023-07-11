const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const AuthRoutes = require("./routes/auth");

app.use("/auth", AuthRoutes);
