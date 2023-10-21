/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// 회원가입 코드
const register = async (req, res) => {
  // 요청받은 email과 암호화한 비밀번호를 db에 저장한다.
  const { email, username, password } = req.body;
  await bcrypt.hash(password, saltRounds, function (err, hash) {
    db.query(`INSERT INTO user (email, username, password) VALUES (?,?,?)`, [email, username, hash], function (err, result, fields) {
      if (err) throw err;
      console.log("회원가입이 완료되었습니다.", result);
      res.redirect("/");
    });
  });
};

const login = (req, res) => {};

const accessToken = (req, res) => {};

const refreshToken = (req, res) => {};

const logout = (req, res) => {};

module.exports = {
  register,
  login,
  accessToken,
  refreshToken,
  logout,
};
