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

module.exports = { SignIn, SignUp };
