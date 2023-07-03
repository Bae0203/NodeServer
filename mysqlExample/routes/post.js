const express = require("express");
const router = express.Router();

router.get("/view", function (req, res) {
  DBconnnection(res);
});

router.post("/add", function (req, res) {
  PostContents({ title: req.body.title, context: req.body.context });
  res.send("저장되었습니다.");
});

router.delete("/del", function (req, res) {
  DeleteContents({ res: res, idx: req.body.idx });
});

module.exports = router;
