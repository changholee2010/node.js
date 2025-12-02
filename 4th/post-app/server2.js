// server.js
const express = require("express");
const userService = require("./service/user.service");
// const pool = require('./config/db.config'); // DB 연결 정보 가정

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. 💡 [POST] 회원 가입 (추가)
app.post("/users/register", async (req, res) => {
  try {
    const { user_id, name, password, phone_number } = req.body;
    const newUser = await userService.register(
      user_id,
      name,
      password,
      phone_number
    );
    res.status(201).json({ message: "회원 가입 성공", data: newUser });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(400).json({ message: "회원 가입 실패", error: error.message });
  }
});

// 2. 💡 [POST] 로그인 (인증)
app.post("/users/login", async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const isAuthenticated = await userService.authenticate(user_id, password);

    if (isAuthenticated) {
      res.status(200).json({ message: "로그인 성공", user_id });
    } else {
      res.status(401).json({ message: "인증 실패: ID 또는 비밀번호 불일치" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 3. 💡 [GET] 회원 정보 단건 조회
app.get("/users/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await userService.getUser(user_id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch User Error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "조회 실패", error: error.message });
  }
});

// 4. 💡 [PUT] 회원 정보 수정 (이름, 연락처)
app.put("/users/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { name, phone_number } = req.body;
    await userService.updateUserInfo(user_id, name, phone_number);
    res.status(200).json({ message: `회원 ID ${user_id} 정보 수정 완료` });
  } catch (error) {
    console.error("Update User Error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: "수정 실패", error: error.message });
  }
});

// 5. 💡 [DELETE] 회원 탈퇴 (삭제)
app.delete("/users/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    await userService.deleteUser(user_id);
    res.status(200).json({ message: `회원 ID ${user_id} 탈퇴 성공` });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "탈퇴 실패", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
