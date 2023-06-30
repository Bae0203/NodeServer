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

function DBconnnection(res) {
  let Query = "SELECT * FROM test1.test";
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
      res.send({ err: "값을 불러오는데 실패하였습니다." });
    }
    res.send({ contents: results });
  });
}
function PostContents(props) {
  let Query = `INSERT INTO test (title,context,idx) VALUES ("${props.title}", "${props.context}", 0);`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
}
function DeleteContents(props) {
  let Query = `DELETE FROM test WHERE idx = ${props.idx};`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
      props.res.send("삭제를 하지 못하였습니다.");
    }
    console.log(results);
    props.res.send("성공적으로 삭제되었습니다.");
  });
}

app.get("/", function (req, res) {
  res.send("hello NodeJs");
});

app.get("/view", function (req, res) {
  DBconnnection(res);
});

app.post("/add", function (req, res) {
  PostContents({ title: req.body.title, context: req.body.context });
  res.send("저장되었습니다.");
});

app.delete("/del", function (req, res) {
  DeleteContents({ res: res, idx: req.body.idx });
});

app.listen(8080, () => {
  console.log("서버 시작");
});
