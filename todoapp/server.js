const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
// let MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://admin:qwer1234@testcluster.2vudydx.mongodb.net/todoapp?retryWrites=true&w=majority";
// mongodb+srv://아이디:비밀번호@testcluster.2vudydx.mongodb.net/collection이름?retryWrites=true&w=majority

let mongoose = require("mongoose");

const postShema = new mongoose.Schema({
  title: String,
  context: String,
  date: String,
});

// 2. testDB 세팅
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");
    Connection();
  })
  .catch((error) => {
    console.error("MongoDB 연결 오류:", error);
  });

function Connection() {
  const Post = mongoose.model("post", postShema);
  Post.find()
    .then((posts) => {
      console.log("모든 문서:", posts);
    })
    .catch((error) => {
      console.error("문서 조회 오류:", error);
    });
  const today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  const NewPost = new Post({
    title: "테스트1",
    context: "테스트22222",
    date: `${year} / ${month} / ${date}`,
  });
  NewPost.save()
    .then((e) => console.log(e))
    .catch((e) => console.log("Error !!! : ", e));
}
