const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const mysql = require("mysql"); // mysql 모듈 로드

const conn = {
  // mysql 접속 설정
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "qwer1234",
  database: "test1",
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();

app.get("/", function (req, res) {
  res.send("hello NodeJs");
});

app.listen(8080, () => {
  console.log("서버 시작");
});
