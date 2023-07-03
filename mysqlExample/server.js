import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

function getDate() {
  const todayDate = new Date();
  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let date = todayDate.getDate();
  let hours = todayDate.getHours(); // 시
  let minutes = todayDate.getMinutes(); // 분
  let today = `${year}-${month}-${date} ${hours}:${minutes}`;
  return today;
}

//게시물 기능
//게시물 불러오기
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
//게시물 등록
function PostContents(props) {
  let today = getDate();
  let Query = `INSERT INTO test (title,context,date,idx) VALUES ("${props.title}", "${props.context}","${today}" , 0);`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
}
//게시물 삭제
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
//게시물 디테일
function GetPostDetail(props) {
  let Query = `SELECT * FROM test WHERE idx = ${props.idx}`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
      props.res.send({ data: "값을 불러오지 못하였습니다." });
    }
    console.log(results);
    props.res.send({ data: results });
  });
}

//댓글 기능
function GetComment(props) {
  let Query = `SELECT * FROM Comment WHERE postidx = ${props.idx}`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
      props.res.send({ data: "값을 불러오지 못하였습니다." });
    }
    console.log(results);
    props.res.send(results);
  });
}

function PostComment(props) {
  let today = getDate();
  let Query = `INSERT INTO Comment (idx,comment,date,postidx) VALUES (0, "${props.comment}", "${today}", ${props.postidx});`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    props.res.send({ message: "성공적으로 게시되었습니다.", result: results });
  });
}
function DeleteComment(props) {
  let Query = `DELETE FROM Comment WHERE idx = ${props.idx};`;
  connection.query(Query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    props.res.send({ message: "성공적으로 삭제되었습니다.", result: results });
  });
}

app.listen(8080, () => {
  console.log("서버 시작");
});

app.get("/", function (req, res) {
  res.send("hello NodeJs");
});

app.get("/view/post", function (req, res) {
  DBconnnection(res);
});

app.post("/add/post", function (req, res) {
  PostContents({ title: req.body.title, context: req.body.context });
  res.send("저장되었습니다.");
});

app.delete("/del/post", function (req, res) {
  DeleteContents({ res: res, idx: req.body.idx });
});

app.get("/detail/:id", function (req, res) {
  GetPostDetail({ idx: req.params.id, res: res });
});

app.post("/add/comment/:id", function (req, res) {
  PostComment({ postidx: req.params.id, res: res, comment: req.body.comment });
});

app.get("/view/comment/:id", function (req, res) {
  GetComment({ idx: req.params.id, res: res });
});

app.delete("/del/comment", function (req, res) {
  DeleteComment({ idx: req.body.idx, res: res });
});
