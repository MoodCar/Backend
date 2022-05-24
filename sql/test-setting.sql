SET foreign_key_checks = 0;

DROP TABLE if exists user;
DROP TABLE if exists diary;
DROP TABLE if exists emotion_score;
DROP TABLE if exists feedback_emotion;
DROP TABLE if exists feedback_hashtag;

set foreign_key_checks = 1;

CREATE TABLE user (
    email VARCHAR(30) NOT NULL,
    name VARCHAR(30),
    provider VARCHAR(20) NOT NULL,
    providerId VARCHAR(50) NOT NULL,
    token VARCHAR(200),
    auth INT NOT NULL DEFAULT(0),
    location VARCHAR(30) DEFAULT(NULL),
    preference VARCHAR(30) DEFAULT(NULL),
    reg_date DATE DEFAULT(current_date),
    PRIMARY KEY (providerId)
);

CREATE TABLE diary (
    id INT NOT NULL AUTO_INCREMENT,
    providerId VARCHAR(50) NOT NULL,
    content VARCHAR(10000) NOT NULL,
    emotion VARCHAR(20),
    contents_id INT DEFAULT (NULL),
    counselor_id INT DEFAULT (NULL),
    hashtag_1 VARCHAR(20) DEFAULT (NULL),
    hashtag_2 VARCHAR(20) DEFAULT (NULL),
    hashtag_3 VARCHAR(20) DEFAULT (NULL),
    written_date DATE DEFAULT(current_date),
    PRIMARY KEY (id),
    FOREIGN KEY (providerId)
    REFERENCES user (providerId) on delete cascade
);

CREATE TABLE emotion_score(
    id INT NOT NULL AUTO_INCREMENT,
    diary_id INT NOT NULL,
    happy_score DOUBLE,
    fear_score DOUBLE,
    disgust_score DOUBLE,
    anger_score DOUBLE,
    neutral_score DOUBLE,
    surprise_score DOUBLE,
    sad_score DOUBLE,
    PRIMARY KEY (id),
    FOREIGN KEY (diary_id)
    REFERENCES diary (id) on delete cascade
);

CREATE TABLE feedback_emotion(
    id INT NOT NULL AUTO_INCREMENT,
    diary_content VARCHAR(10000) NOT NULL,
    emotion_original VARCHAR(20),
    emotion_changed VARCHAR(20),
    opinion VARCHAR(2000),
    PRIMARY KEY (id)
);

CREATE TABLE feedback_hashtag(
    id INT NOT NULL AUTO_INCREMENT,
    diary_content VARCHAR(10000) NOT NULL,
    hashtag1_original VARCHAR(20),
    hashtag2_original VARCHAR(20),
    hashtag3_original VARCHAR(20),
    hashtag1_changed VARCHAR(20),
    hashtag2_changed VARCHAR(20),
    hashtag3_changed VARCHAR(20),
    opinion VARCHAR(2000),
    PRIMARY KEY (id)
);

CREATE TABLE feedback_hashtag(
    id INT NOT NULL AUTO_INCREMENT,
    diary_content VARCHAR(10000) NOT NULL,
    hashtag1_original VARCHAR(20),
    hashtag2_original VARCHAR(20),
    hashtag3_original VARCHAR(20),
    hashtag1_changed VARCHAR(20),
    hashtag2_changed VARCHAR(20),
    hashtag3_changed VARCHAR(20),
    opinion VARCHAR(2000),
    PRIMARY KEY (id)
);

CREATE TABLE content(
    id INT NOT NULL AUTO_INCREMENT,
    type varchar(30),
    emotion varchar(30),
    name varchar(50),
    publisher varchar(50),
    url varchar(300),
    PRIMARY KEY(id)
);

insert into user(email,name,provider,providerId,token) values ("asd123@gmail.com","테스트1","google","123124435","qeklnklviqoebbzscklb12312445");
insert into user(email,name,provider,providerId,token) values ("qwesad123@gmail.com","테스트2","google","435624563","snklfnalknk123ehilg123756i1z");
insert into user(email,name,provider,providerId,token) values ("bnlik4tn21@gmail.com","테스트3","google","906457842","v2b98by98c189xhiu5ninanklas");
insert into user(email,name,provider,providerId,token) values ("46nklnszc@gmail.com","테스트4","google","785681234","43btvny981y98cn1noihjnroiqw");

insert into diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,contents_id) values ("123124435","그녀의 모습을 목격하는 순간부터 내 가슴은 땅울림처럼 떨리고, 입안은 사막처럼 바싹 말라버린다.","놀람", "여행","스페인","비행기","285");
insert into diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,contents_id) values ("435624563","내가 지금 기억할 수 있는 것은, 그녀가 그다지 미인이 아니었다는 사실 뿐이다. 왠지 조금 이상하기도 하다.","행복","마스크","빨래","카페","123");
insert into diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,contents_id) values ("906457842","그녀는 동에서 서로, 나는 서에서 동으로 걷고 있었다. 제법 기분이 좋은 4월의 아침이다.","중립","독서","청소","게임","3");
insert into diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,contents_id,written_date) values ("906457842","그녀는 동에서 서로, 나는 서에서 동으로 걷고 있었다. 제법 기분이 좋은 4월의 아침이다.","중립","독서","청소","게임","57","2022-05-15");

insert into emotion_score(diary_id,happy_score,fear_score,disgust_score,anger_score,neutral_score,surprise_score,sad_score) values (1,22.3,11.5,8.7,5.7,44.8,3.7,3.3);
insert into emotion_score(diary_id,happy_score,fear_score,disgust_score,anger_score,neutral_score,surprise_score,sad_score) values (2,11.5,8.7,5.7,44.8,3.7,3.3,22.3);
insert into emotion_score(diary_id,happy_score,fear_score,disgust_score,anger_score,neutral_score,surprise_score,sad_score) values (3,8.7,5.7,44.8,3.7,3.3,22.3,11.5);
insert into emotion_score(diary_id,happy_score,fear_score,disgust_score,anger_score,neutral_score,surprise_score,sad_score) values (4,8.7,5.7,44.8,3.7,3.3,22.3,11.5);