const express = require("express"); //express를 설치했기 때문에 가져올 수 있다.
const app = express();

app.get("/", (req, res) => {
  res.send("안녕하세요!");
});

app.listen(5000);
