// service/board.service.js
const boardRepository = require("../repository/board.repository");

class BoardService {
  // 1. 💡 게시글 생성
  async createPost(title, content, author, images = null) {
    // 비즈니스 로직: 필수 입력값 확인
    if (!title || !content || !author) {
      throw new Error("Title, content, and author are required.");
    }

    const newId = await boardRepository.create(title, content, author, images);
    return { board_id: newId, title, author };
  }

  // 2. 💡 게시글 전체 목록 및 검색
  async getPosts(searchKeyword) {
    // 비즈니스 로직: 검색 키워드 길이 제한 등 추가 가능 (여기서는 단순 전달)
    const posts = await boardRepository.findAll(searchKeyword);

    // 데이터 가공 예시: 내용(content)은 목록에서 제외 (민감 정보 제거)
    const safePosts = posts.map((post) => {
      const { content, ...rest } = post; // content 속성만 제외
      return rest;
    });

    return safePosts;
  }

  // 3. 💡 단건 조회
  async getPostById(board_id) {
    const post = await boardRepository.findById(board_id);

    // 비즈니스 로직: 게시글이 없는 경우 처리
    if (!post) {
      throw new Error(`Post with ID ${board_id} not found.`);
    }
    return post;
  }

  // 4. 💡 게시글 수정
  async updatePost(board_id, title, content, images = null) {
    // 비즈니스 로직: 수정할 내용의 유효성 검사 (예: 제목 길이)
    if (!title || !content) {
      throw new Error("Title and content are required for update.");
    }

    const affectedRows = await boardRepository.update(
      board_id,
      title,
      content,
      images
    );

    // 비즈니스 로직: 수정된 행이 없으면 에러
    if (affectedRows === 0) {
      throw new Error(`Post with ID ${board_id} not found or no changes made.`);
    }
    return affectedRows;
  }

  // 5. 💡 게시글 삭제
  async deletePost(board_id) {
    const affectedRows = await boardRepository.delete(board_id);

    // 비즈니스 로직: 삭제된 행이 없으면 에러
    if (affectedRows === 0) {
      throw new Error(`Post with ID ${board_id} not found.`);
    }
    return affectedRows;
  }
}

module.exports = new BoardService();
