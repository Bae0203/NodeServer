const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("listening on 8080");
});

/**
 * 누군가가 /pet으로 방문을 하면
 * pet에 관련된 안내문을 띄워주자
 */

//요청 = req, 응답 = res
app.get("/pet", function (요청, 응답) {
  응답.send("펫 관련 페이지입니다.");
});

app.get("/beauty", function (req, res) {
  res.send("화장품 관련 페이지입니다.");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", (req, res) => {
  res.send("전송완료");
});
