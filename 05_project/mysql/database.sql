use dev;

-- 1) product 테이블.
drop table if exists t_product;
CREATE TABLE t_product (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL DEFAULT '',
    product_price INT(11) NOT NULL DEFAULT 0,
    delivery_price INT(11) NOT NULL DEFAULT 0,
    add_delivery_price INT(11) NOT NULL DEFAULT 0,
    tags VARCHAR(100) DEFAULT NULL,
    outbound_days INT(2) NOT NULL DEFAULT 5,
    seller_id INT(11) UNSIGNED NOT NULL DEFAULT 0,
    category_id INT UNSIGNED NOT NULL DEFAULT 0,
    active_yn ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP (),
    PRIMARY KEY (id),
    KEY seller_id (seller_id),
    KEY category_id (category_id),
    CONSTRAINT t_product_ibfk_1 FOREIGN KEY (seller_id)
        REFERENCES t_seller (id),
    CONSTRAINT t_product_ibfk_2 FOREIGN KEY (category_id)
        REFERENCES t_category (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;
-- alter table t_product alter column seller_id set default 0;
-- alter table t_product alter column category_id set default 0;

-- 2) image 테이블.
drop table if exists t_image;
CREATE TABLE t_image (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT(11) UNSIGNED NOT NULL,
    type INT(1) NOT NULL DEFAULT 1 COMMENT '1-썸네일, 2-제품이미지, 3-제품설명이미지',
    path VARCHAR(150) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    KEY product_id (product_id),
    CONSTRAINT t_image_ibfk_1 FOREIGN KEY (product_id)
        REFERENCES t_product (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- 3) user 테이블.
drop table if exists t_user;
CREATE TABLE t_user (
    email VARCHAR(50) NOT NULL DEFAULT '',
    type INT(1) NOT NULL DEFAULT 1 COMMENT '1-buyer, 2-seller',
    nickname VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (email)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- 4) seller 테이블.
drop table if exists t_seller;
CREATE TABLE t_seller (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
    phone VARCHAR(20) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- 5) category 테이블.
drop table if exists t_category;
CREATE TABLE t_category (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    category1 VARCHAR(100) NOT NULL DEFAULT '',
    category2 VARCHAR(100) NOT NULL DEFAULT '',
    category3 VARCHAR(100) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

