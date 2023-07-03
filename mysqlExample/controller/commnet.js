let connection = require("../db/Connect");
let getDate = require("../util/getToday");

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

module.exports = { GetComment, PostComment, DeleteComment };
