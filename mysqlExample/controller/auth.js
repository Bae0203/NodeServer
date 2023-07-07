const bcrypt = require("bcrypt");
let connection = require("../db/Connect");

function SignIn(props) {
  let Query = `SELECT * FROM UserInfo WHERE userId = "${props.id}"`;
  connection.query(Query, function (err, result) {
    if (err) {
      console.log("Error", err);
      return false;
    }
    console.log("Success", result);
    const isMatch = bcrypt.compare(props.password, result[0].userPassword);
    console.log(isMatch);
    return isMatch;
  });
}

function GetName(props) {
  let Query = `SELECT userName AS name FROM UserInfo WHERE userId = "${props.id}"`;
  connection.query(Query, function (err, result) {
    if (err) {
      console.log("Error", err);
      return "";
    }
    return { name: result[0].name };
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

module.exports = { SignIn, SignUp, GetName, IdCheck };
