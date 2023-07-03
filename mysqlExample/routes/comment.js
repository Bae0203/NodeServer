const express = require("express");
const commentRoutes = express.Router();
const {
  GetComment,
  PostComment,
  DeleteComment,
} = require("../controller/commnet");

commentRoutes.post("/add/:id", function (req, res) {
  PostComment({ postidx: req.params.id, res: res, comment: req.body.comment });
});

commentRoutes.get("/view/:id", function (req, res) {
  GetComment({ idx: req.params.id, res: res });
});

commentRoutes.delete("/del", function (req, res) {
  DeleteComment({ idx: req.body.idx, res: res });
});

module.exports = commentRoutes;
