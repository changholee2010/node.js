use dev; -- 사용할 db 선택.
show tables;

create table users (
  user_id varchar(20) not null,
  user_pw varchar(100) not null,
  salt    varchar(100) not null,
  user_nm varchar(50) not null,
  primary key (user_id)
);

select * from users;

insert into users values ('user01','1111','1111','홍길동');
insert into users set user_id='user02'
                     ,user_pw='2222'
                     ,salt='2222'
                     ,user_nm='김민수';
update users
set  user_pw='23434dfsdakfl'
    ,salt='dfklsdafjkdlsfa'
where user_id = 'user02';
delete from users where user_id = 'user02';
