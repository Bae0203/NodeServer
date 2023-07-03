const express = require("express");
const postRoutes = express.Router();
const {
  DBconnnection,
  PostContents,
  DeleteContents,
  GetPostDetail,
} = require("../controller/post");

postRoutes.get("/view", function (req, res) {
  DBconnnection(res);
});

postRoutes.post("/add", function (req, res) {
  PostContents({ title: req.body.title, context: req.body.context });
  res.send("저장되었습니다.");
});

postRoutes.delete("/del", function (req, res) {
  DeleteContents({ res: res, idx: req.body.idx });
});

postRoutes.get("/detail/:id", function (req, res) {
  GetPostDetail({ idx: req.params.id, res: res });
});

module.exports = postRoutes;
