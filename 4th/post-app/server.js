// server.js
const express = require("express");
const postService = require("./service/post.service");

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json()); // JSON 요청 본문 파싱

app.get("/", async (req, res) => {
  res.send("/ 경로호출됨.");
});

// 💡 게시글 목록을 조회하는 라우트 (Presentation Layer)
app.get("/posts", async (req, res) => {
  try {
    // 비즈니스 계층의 함수를 호출하여 데이터를 가져옵니다.
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
});

// 💡 새 게시글을 생성하는 라우트 (Presentation Layer)
app.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    // 비즈니스 계층의 함수를 호출하여 로직을 수행합니다.
    const newPost = await postService.createNewPost(title, content);
    res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    // 클라이언트 입력 오류인 경우 400 Bad Request 반환
    if (error.message.includes("must be provided")) {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
