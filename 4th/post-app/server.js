// server.js
const express = require("express");
const boardService = require("./service/board.service");
const userService = require("./service/user.service");

const pool = require("./config/db.config"); // DB 연결 테스트용으로 사용

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json()); // JSON 요청 본문 파싱

// --- API 라우트 정의 ---

// 1. 💡 [POST] 게시글 생성: /boards
app.post("/boards", async (req, res) => {
  try {
    const { title, content, author, images } = req.body;
    const newPost = await boardService.createPost(
      title,
      content,
      author,
      images
    );
    res.status(201).json({
      message: "게시글이 성공적으로 생성되었습니다.",
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(400).json({
      message: "게시글 생성 실패: 유효하지 않은 입력값",
      error: error.message,
    });
  }
});

// 2. 💡 [GET] 전체 목록 및 검색: /boards?search={keyword}
app.get("/boards", async (req, res) => {
  console.log(req.query.search);
  try {
    // 쿼리 파라미터에서 검색 키워드를 가져옵니다.
    const searchKeyword = req.query.search;
    const posts = await boardService.getPosts(searchKeyword);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res
      .status(500)
      .json({ message: "게시글 목록 조회 실패", error: error.message });
  }
});

// 3. 💡 [GET] 단건 조회: /boards/:id
app.get("/boards/:id", async (req, res) => {
  try {
    const board_id = parseInt(req.params.id);
    const post = await boardService.getPostById(board_id);
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    // 게시글을 찾지 못한 경우 404 응답
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "게시글 조회 실패", error: error.message });
  }
});

// 4. 💡 [PUT] 게시글 수정: /boards/:id
app.put("/boards/:id", async (req, res) => {
  try {
    const board_id = parseInt(req.params.id);
    const { title, content, images } = req.body;

    await boardService.updatePost(board_id, title, content, images);
    res
      .status(200)
      .json({ message: `게시글 ID ${board_id}가 성공적으로 수정되었습니다.` });
  } catch (error) {
    console.error("Error updating post:", error.message);
    // 유효성 검사 실패 또는 게시글을 찾지 못한 경우 400/404 응답
    if (
      error.message.includes("required") ||
      error.message.includes("no changes")
    ) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "게시글 수정 실패", error: error.message });
  }
});

// 5. 💡 [DELETE] 게시글 삭제: /boards/:id
app.delete("/boards/:id", async (req, res) => {
  try {
    const board_id = parseInt(req.params.id);
    await boardService.deletePost(board_id);
    res
      .status(200)
      .json({ message: `게시글 ID ${board_id}가 성공적으로 삭제되었습니다.` });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    // 게시글을 찾지 못한 경우 404 응답
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "게시글 삭제 실패", error: error.message });
  }
});

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

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
