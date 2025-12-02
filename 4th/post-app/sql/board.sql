CREATE TABLE board (
  board_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(250) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  images varchar(250),
  PRIMARY KEY (board_id)
);

select * from board;

CREATE TABLE users (
    user_id VARCHAR(50) NOT NULL, -- 회원 아이디 (기본키)
    name VARCHAR(100) NOT NULL,    -- 이름
    password_hash VARCHAR(255) NOT NULL, -- 해시된 비밀번호
    salt VARCHAR(255) NOT NULL,    -- 비밀번호 해시에 사용된 salt
    phone_number VARCHAR(20),      -- 연락처 정보
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

select * from users;