// service/post.service.js
const postRepository = require("../repository/post.repository");

class PostService {
  // 💡 게시글 목록을 가져와서 비즈니스 로직을 적용하는 함수
  async getAllPosts() {
    const posts = await postRepository.findAll();

    // 예시 비즈니스 로직: 게시글이 없으면 에러를 발생시키거나 빈 배열을 반환
    if (!posts || posts.length === 0) {
      return [];
    }

    // 데이터 가공 예시: 모든 제목을 대문자로 변환
    const processedPosts = posts.map((post) => ({
      ...post,
      title: post.title.toUpperCase(),
    }));

    return processedPosts;
  }

  // 💡 새 게시글을 생성하는 함수
  async createNewPost(title, content, author) {
    // 비즈니스 로직: 제목이나 내용이 비어있으면 에러 발생
    if (!title || !content || !author) {
      throw new Error("Title and content must be provided.");
    }

    const newPostId = await postRepository.create(title, content, author);
    return { id: newPostId, title, content, author };
  }
}

module.exports = new PostService();
