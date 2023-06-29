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

function DBconnnection() {
  let Query = "SELECT * FROM test1.test";
  connection.query(Query, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
}
function PostContents(props) {
  let Query = `INSERT INTO test (title,context,idx) VALUES ("${props.title}", "${props.context}", 0);`;
  connection.query(Query, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
}

app.get("/", function (req, res) {
  res.send("hello NodeJs");
});

app.get("/view", function (req, res) {
  DBconnnection();
  res.send("hello NodeJs");
});

app.post("/add", function (req, res) {
  PostContents({ title: req.body.title, context: req.body.context });
  res.send("저장되었습니다.");
});

app.listen(8080, () => {
  console.log("서버 시작");
});
