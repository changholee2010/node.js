// service/user.service.js
const userRepository = require("../repository/user.repository");
const bcrypt = require("bcryptjs"); // 비밀번호 해시를 위한 라이브러리 가정

// 해시 생성 시 사용할 Salt 라운드
const saltRounds = 10;

class UserService {
  // 1. 💡 회원 가입
  async register(user_id, name, password, phone_number) {
    if (!user_id || !password || !name) {
      throw new Error("ID, name, and password are required.");
    }

    // 1. Salt 생성
    const salt = await bcrypt.genSalt(saltRounds);
    // 2. 비밀번호 해시
    const password_hash = await bcrypt.hash(password, salt);

    // Repository에 데이터 접근을 위임
    const affectedRows = await userRepository.create(
      user_id,
      name,
      password_hash,
      salt,
      phone_number
    );

    if (affectedRows === 0) {
      throw new Error("User creation failed (likely duplicate ID).");
    }
    return { user_id, name };
  }

  // 2. 💡 로그인 인증 (Authentication)
  async authenticate(user_id, password) {
    const userCredentials = await userRepository.findByIdWithCredentials(
      user_id
    );

    if (!userCredentials) {
      return false; // ID 없음
    }

    // 입력된 비밀번호와 저장된 해시 비교
    const isMatch = await bcrypt.compare(
      password,
      userCredentials.password_hash
    );

    return isMatch;
  }

  // 3. 💡 회원 정보 조회
  async getUser(user_id) {
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new Error(`User with ID ${user_id} not found.`);
    }
    return user;
  }

  // 4. 💡 회원 정보 수정 (비밀번호 제외)
  async updateUserInfo(user_id, name, phone_number) {
    if (!name) {
      throw new Error("Name is required for update.");
    }

    const affectedRows = await userRepository.update(
      user_id,
      name,
      phone_number
    );
    if (affectedRows === 0) {
      throw new Error(`User ID ${user_id} not found or no changes made.`);
    }
    return affectedRows;
  }

  // 5. 💡 비밀번호 변경
  async changePassword(user_id, new_password) {
    if (new_password.length < 8) {
      // 비밀번호 길이 정책
      throw new Error("Password must be at least 8 characters.");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const password_hash = await bcrypt.hash(new_password, salt);

    const affectedRows = await userRepository.updatePassword(
      user_id,
      password_hash,
      salt
    );
    if (affectedRows === 0) {
      throw new Error(`User ID ${user_id} not found.`);
    }
    return affectedRows;
  }

  // 6. 💡 회원 탈퇴
  async deleteUser(user_id) {
    const affectedRows = await userRepository.delete(user_id);
    if (affectedRows === 0) {
      throw new Error(`User ID ${user_id} not found.`);
    }
    return affectedRows;
  }
}

module.exports = new UserService();
