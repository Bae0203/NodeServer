const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(express.json());
app.use(cors());

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

const totalCounter = new mongoose.Schema({
  totalPost: Number,
  name: String,
});

// 2. testDB 세팅
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");
  })
  .catch((error) => {
    console.error("MongoDB 연결 오류:", error);
  });

function Connection(props) {
  const Post = mongoose.model("post", postShema);
  const today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  const NewPost = new Post({
    _id: props._id,
    title: props.title,
    context: props.context,
    date: `${year} / ${month} / ${date}`,
  });
  console.log("");
  NewPost.save()
    .then((_) => console.log("성공적으로 저장했습니다."))
    .catch((e) => console.log("Error !!! : ", e));
}

app.post("/add", (req, rep) => {
  let totalPost;
  const Counter = mongoose.model("counter", totalCounter);
  Counter.findOne({ name: "게시물 갯수" })
    .then((e) => {
      console.log("총 게시물 갯수 : ", e.totalPost);
      totalPost = e.totalPost;
      Connection({
        _id: totalPost + 1,
        title: req.body.title,
        context: req.body.context,
      });
      rep.send({ text: "저장되었습니다.", value: req.body });
      const newCounter = new Counter({
        name: "게시물 갯수",
        totalPost: totalPost + 1,
      });
      newCounter
        .updateOne()
        .then((_) => console.log("게시물 갯수가 성공적으로 저장했습니다."))
        .catch((e) => console.log("Error !!! : ", e));
    })
    .catch((_) => {
      rep.send({ text: "저장 애러 - 게시물 갯수 확인 실패", value: req.body });
    });
});

app.get("/view", (req, rep) => {
  let list = [];
  const Post = mongoose.model("post", postShema);
  Post.find()
    .then((posts) => {
      list = [...posts];
      console.log("문서를 불러왔습니다. 총 문서 수 : ", posts.length);
      rep.send({ list: list });
    })
    .catch((error) => {
      console.error("문서 조회 오류:", error);
      rep.send({ list: list });
    });
});

app.listen(8080);
