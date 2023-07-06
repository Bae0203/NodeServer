let connection = require("../db/Connect");

function SignIn(props) {}

function SignUp(props) {
  let Query = `INSERT INTO UserInfo (userId, userPassword, userName) VALUES ("${props.id}", "${props.password}", "${props.name}");`;
  connection.query(Query, function (err, result) {
    if (err) {
      console.log("Error", err);
    }
    console.log("Success", result);
  });
}

function IdCheck(props) {
  let Query = `SELECT COUNT(*) AS count FROM UserInfo WHERE userId = '${props.id}';`;
  connection.query(Query, function (err, result) {
    if (err) {
      console.log("Error", err);
    }
    const count = result[0].count;
    if (count === 0) {
      props.res.send({ idCheck: true });
      console.log("새로운 아이디 사용 가능");
    } else {
      props.res.send({ idCheck: false });
      console.log("이미 동일한 아이디가 존재합니다");
    }
  });
}

module.exports = { SignIn, SignUp, IdCheck };
