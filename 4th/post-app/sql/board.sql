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