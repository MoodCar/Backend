SET foreign_key_checks = 0;

DROP TABLE if exists user;
DROP TABLE if exists diary;

set foreign_key_checks = 1;

CREATE TABLE user (
    email VARCHAR(30) NOT NULL,
    name VARCHAR(30),
    provider VARCHAR(20) NOT NULL,
    providerId VARCHAR(50) NOT NULL,
    token VARCHAR(200),
    auth INT NOT NULL DEFAULT(0),
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

insert into user(email,name,provider,providerId,token) values ("asd123@gmail.com","테스트","google","123124435","qeklnklviqoebbzscklb12312445");
insert into user(email,name,provider,providerId,token) values ("qwesad123@gmail.com","테스트2","google","435624563","snklfnalknk123ehilg123756i1z");
insert into user(email,name,provider,providerId,token) values ("bnlik4tn21@gmail.com","테스트3","google","906457842","v2b98by98c189xhiu5ninanklas");

insert into diary(providerId,content) values ("123124435","그녀의 모습을 목격하는 순간부터 내 가슴은 땅울림처럼 떨리고, 입안은 사막처럼 바싹 말라버린다.");
insert into diary(providerId,content) values ("435624563","내가 지금 기억할 수 있는 것은, 그녀가 그다지 미인이 아니었다는 사실 뿐이다. 왠지 조금 이상하기도 하다.");
insert into diary(providerId,content) values ("906457842","그녀는 동에서 서로, 나는 서에서 동으로 걷고 있었다. 제법 기분이 좋은 4월의 아침이다.");
