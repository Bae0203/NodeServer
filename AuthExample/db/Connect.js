const mysql = require("mysql"); // mysql 모듈 로드

const conn = {
  // mysql 접속 설정
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "qwer1234",
  database: "AuthTest",
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();
console.log("DB 연결");

module.exports = connection;
