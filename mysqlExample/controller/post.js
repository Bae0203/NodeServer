let connection = require("../db/Connect");
let getDate = require("../util/getToday");

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

module.exports = { DBconnnection, PostContents, DeleteContents, GetPostDetail };
