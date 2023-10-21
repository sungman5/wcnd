/** @format */

const express = require("express");
const app = express();
const next = require("next");
const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotevn = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotevn.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: path.resolve(__dirname, "../"), conf: { distDir: "../.next" } });
const handle = nextApp.getRequestHandler();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

nextApp.prepare().then(() => {
  const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  // register
  app.post("/api/regist", async (req, res) => {
    // 요청받은 email과 암호화한 비밀번호를 db에 저장한다.
    const { email, username, password } = req.body;
    await bcrypt.hash(password, saltRounds, function (err, hash) {
      db.query(`INSERT INTO user (email, username, password) VALUES (?,?,?)`, [email, username, hash], function (err, result, fields) {
        if (err) throw err;
        console.log("회원가입이 완료되었습니다.", result);
        res.redirect("/");
      });
    });
  });

  // login
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // 1. db에 저장된 email이 있는지 찾는다.
    db.query(`SELECT * FROM user WHERE email = ?`, [email], async function (err, userData, fields) {
      console.log("결과?", userData);
      // 2. email이 있다면, 비밀번호가 맞는지 확인한다.
      if (!userData || userData.length === 0) {
        // 3. email이 없다면, 일치하는 회원이 없다는 메시지를 보낸다.
        // return res.json({ message: "일치하는 회원이 없습니다." });
        return res.status(403).json("일치하는 회원이 없습니다");
      } else {
        try {
          const result = await bcrypt.compare(password, userData[0].password);
          console.log("result?", result);
          if (result) {
            // 4. 비밀번호가 맞다면, 로그인 성공 메시지를 보낸다.
            console.log("로그인 성공");
            // 5. 엑세스 토큰 생성
            const accessToken = jwt.sign(
              // 첫번째인자
              {
                id: userData[0].id,
                email: userData[0].email,
                username: userData[0].username,
              },
              // 두번째인자
              process.env.ACCESS_SECRET,
              // 세번째 인자
              {
                expiresIn: "1m",
                issuer: "wcnd",
              }
            );

            // 6. accessToken발급과 함께 리프레시 토큰 생성
            const refreshToken = jwt.sign(
              // 첫번째인자
              {
                id: userData[0].id,
                email: userData[0].email,
                username: userData[0].username,
              },
              // 두번째인자
              process.env.REFRESH_SECRET,
              // 세번째 인자
              {
                expiresIn: "24h",
                issuer: "wcnd",
              }
            );

            // 7. 발급한 accessToken과 refreshToken을 cookie에 담아서 클라이언트로 전송
            res.cookie("accessToken", accessToken, {
              // secure은 http프로토콜과 https 프로토콜에 따라 달라지는데, http의 경우 false, https의 경우 true로 설정한다.
              secure: false,
              // httpOnly 옵션을 true로 하면 javascript에서 접근이 불가능해진다.
              httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
              // secure은 http프로토콜과 https 프로토콜에 따라 달라지는데, http의 경우 false, https의 경우 true로 설정한다.
              secure: false,
              // httpOnly 옵션을 true로 하면 javascript에서 접근이 불가능해진다.
              httpOnly: true,
            });

            res.status(200).json("로그인 성공");

            // return res.redirect("/");
          } else {
            // 5. 비밀번호가 틀리다면, 비밀번호가 틀렸다는 메시지를 보낸다.
            return res.send({ message: "비밀번호가 틀렸습니다." });
          }
        } catch (err) {
          console.error(err);
          return res.status(500).send({ message: "서버 에러" });
        }
      }
    });
  });


  app.post('/api/logout', (req, res) => {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.status(200).json('로그아웃 성공');
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });
  

  // Handle everything else with Next.js

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT;
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
