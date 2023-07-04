const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const authRoutes = require("./routes/auth");

app.listen(8080, () => {
  console.log("서버 시작");
});

app.use("/post", postRoutes);

app.use("/comment", commentRoutes);

app.use("/auth", authRoutes);
