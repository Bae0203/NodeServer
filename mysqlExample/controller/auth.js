const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let connection = require("../db/Connect");

async function SignIn(props) {
  const id = props.id;
  let Query = `SELECT * FROM UserInfo WHERE userId = "${id}"`;

  connection.query(Query, async function (err, result) {
    if (err) {
      console.log("Error", err);
    }
    const isMatch = bcrypt.compareSync(props.password, result[0].userPassword);
    if (!isMatch) {
      props.res.send({ message: "계정이 없거나 정보가 일치하지 않습니다." });
      return;
    }
    const token = jwt.sign({ id }, "login_token");
    props.res.json({ token });
  });
}

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
    } else {
      props.res.send({ idCheck: false });
    }
  });
}

module.exports = { SignIn, SignUp, IdCheck };
