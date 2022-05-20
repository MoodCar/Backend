const request = require("supertest");
const app = require("../index");
const should = require("should");
const { pool } = require("../models/db.js");

let Content = {
  content:
    "그녀의 모습을 목격하는 순간부터 내 가슴은 땅울림처럼 떨리고, 입안은 사막처럼 바싹 말라버린다.",
};
let updateContent = { content: "너와 함께라면 나는 언제나 행복해" };
let emotion = {
  emotion: "슬픔",
};

let hashtag = {
    hashtag_1 : "김밥",
    hashtag_2 : "소풍",
    hashtag_3 : "회식"
};


describe("GET /diaries/:providerId", () => {
  it("존재하지 않는 사용자의 일기목록을 가져오는 Test", (done) => {
    request(app)
      .get("/diaries/238470982750914324")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /diaries/details/:Id", () => {
  it("존재하지 않는 일기의 세부 내용을 가져오는 Test", (done) => {
    request(app)
      .get("/diaries/details/238470982750914324")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check Diary id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/details/:Id", () => {
  it("존재하지 않는 일기를 수정하는 Test", (done) => {
    request(app)
      .patch("/diaries/details/238470982750914324")
      .send(Content)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check Diary id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /diaries/:providerId", () => {
  it("작성된 일기가 없는 사용자의 일기목록 가져오는 Test", (done) => {
    request(app)
      .get("/diaries/785681234")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Diary doesn't exist.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/:providerId", () => {
  it("일기 작성 Test (존재하지 않는 providerId test.)", (done) => {
    request(app)
      .post("/diaries/1231231124435")
      .send(Content)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/:providerId", () => {
  it("일기 작성 Test (잘못된 Content)", (done) => {
    request(app)
      .post("/diaries/785681234")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(400);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Please check content input.");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /diaries/today/:providerId", () => {
  it("TodayResult 실패 Test (존재하지 않는 providerId)", (done) => {
    request(app)
      .get("/diaries/today/785681285237489169421834")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /diaries/today/:providerId", () => {
  it("TodayResult 성공 Test (오늘 작성한 일기 존재x)", (done) => {
    request(app)
      .get("/diaries/today/785681234")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.message.should.be.equal("No diary is written today. continue to write diary.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/:providerId", () => {
  it("성공적인 일기 작성 Test", (done) => {
    request(app)
      .post("/diaries/785681234")
      .send(Content)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.message.should.be.equal("Writing diary is successfully done");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        console.log(res.body);
        done();
      });
  });
});

describe("GET /diaries/today/:providerId", () => {
  it("TodayResult 성공 Test (오늘 작성된 일기 존재)", (done) => {
    request(app)
      .get("/diaries/today/785681234")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(400);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Today's diary already exists.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/:providerId", () => {
  it("일기 중복 작성 Test", (done) => {
    request(app)
      .post("/diaries/785681234")
      .send(Content)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(409);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("You already wrote diary today.");
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/:providerId", () => {
  it("일기 수정 실패 Test(Content 입력 안넣음)", (done) => {
    request(app)
      .patch("/diaries/details/4")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(400);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Please check content input.");
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/:providerId", () => {
  it("일기 수정 성공 Test", (done) => {
    request(app)
      .patch("/diaries/details/5")
      .send(updateContent)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.message.should.be.equal("Updating diary is successfully done");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/emotions/:Id", () => {
  it("일기 감정만 수정 실패 Test (수정할 감정 입력x)", (done) => {
    request(app)
      .patch("/diaries/emotions/5")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.message.should.be.equal("Please check emotion input.");
        res.body.code.should.be.equal(400);
        res.body.isSuccess.should.be.equal(false);
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/emotions/:Id", () => {
  it("일기 감정만 수정 실패 Test (존재하지 않는 DiaryId)", (done) => {
    request(app)
      .patch("/diaries/emotions/2389418927")
      .send(emotion)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.message.should.be.equal("Check Diary id value.");
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/emotions/:Id", () => {
  it("일기 감정만 수정 성공 Test", (done) => {
    request(app)
      .patch("/diaries/emotions/5")
      .send(emotion)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.message.should.be.equal(
          "Updating emotion of diary is successfully done"
        );
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /diaries/hashtags/:id", () => {
    it("일기 해시태그 수정 실패 Test (hashtag 입력 존재x)", (done) => {
      request(app)
        .patch("/diaries/hashtags/5")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.body.message.should.be.equal(
            "Please check hashtag input."
          );
          res.body.code.should.be.equal(400);
          res.body.isSuccess.should.be.equal(false);
          console.log(res.body);
          done();
        });
    });
  });

  describe("PATCH /diaries/hashtags/:id", () => {
    it("일기 해시태그 수정 실패 Test (존재하지 않는 DiaryId)", (done) => {
      request(app)
        .patch("/diaries/hashtags/42957209")
        .send(hashtag)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.body.message.should.be.equal(
            "Check Diary id value."
          );
          res.body.code.should.be.equal(404);
          res.body.isSuccess.should.be.equal(false);
          console.log(res.body);
          done();
        });
    });
  });

  describe("PATCH /diaries/hashtags/:id", () => {
    it("일기 해시태그 수정 성공 Test", (done) => {
      request(app)
        .patch("/diaries/hashtags/5")
        .send(hashtag)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.body.message.should.be.equal(
            "Updating hashtag of diary is successfully done"
          );
          res.body.code.should.be.equal(200);
          res.body.isSuccess.should.be.equal(true);
          console.log(res.body);
          done();
        });
    });
  });

describe("GET /diaries/:providerId", () => {
  it("일기 목록을 성공적으로 가져오는 Test", (done) => {
    request(app)
      .get("/diaries/906457842")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("fetchResult");
        should.exist(res.body.fetchResult[0].id);
        should.exist(res.body.fetchResult[0].emotion);
        should.exist(res.body.fetchResult[0].content);
        should.exist(res.body.fetchResult[0].providerId);
        should.exist(res.body.fetchResult[0].hashtag_1);
        should.exist(res.body.fetchResult[0].hashtag_2);
        should.exist(res.body.fetchResult[0].hashtag_3);
        should.exist(res.body.fetchResult[0].sad_score);
        should.exist(res.body.fetchResult[0].happy_score);
        should.exist(res.body.fetchResult[0].fear_score);
        should.exist(res.body.fetchResult[0].disgust_score);
        should.exist(res.body.fetchResult[0].anger_score);
        should.exist(res.body.fetchResult[0].neutral_score);
        should.exist(res.body.fetchResult[0].surprise_score);
        should.exist(res.body.fetchResult[0].written_date);
        should.exist(res.body.fetchResult[1].id);
        should.exist(res.body.fetchResult[1].emotion);
        should.exist(res.body.fetchResult[1].content);
        should.exist(res.body.fetchResult[1].providerId);
        should.exist(res.body.fetchResult[1].hashtag_1);
        should.exist(res.body.fetchResult[1].hashtag_2);
        should.exist(res.body.fetchResult[1].hashtag_3);
        should.exist(res.body.fetchResult[1].sad_score);
        should.exist(res.body.fetchResult[1].happy_score);
        should.exist(res.body.fetchResult[1].fear_score);
        should.exist(res.body.fetchResult[1].disgust_score);
        should.exist(res.body.fetchResult[1].anger_score);
        should.exist(res.body.fetchResult[1].neutral_score);
        should.exist(res.body.fetchResult[1].surprise_score);
        should.exist(res.body.fetchResult[1].written_date);
        console.log(res.body);
        done();
      });
  });
});

describe("GET /diaries/details/:Id", () => {
  it("일기의 세부 내용을 성공적으로 가져오는 Test", (done) => {
    request(app)
      .get("/diaries/details/4")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("fetchResult");
        should.exist(res.body.fetchResult[0].id);
        should.exist(res.body.fetchResult[0].emotion);
        should.exist(res.body.fetchResult[0].content);
        should.exist(res.body.fetchResult[0].providerId);
        should.exist(res.body.fetchResult[0].hashtag_1);
        should.exist(res.body.fetchResult[0].hashtag_2);
        should.exist(res.body.fetchResult[0].hashtag_3);
        should.exist(res.body.fetchResult[0].sad_score);
        should.exist(res.body.fetchResult[0].happy_score);
        should.exist(res.body.fetchResult[0].fear_score);
        should.exist(res.body.fetchResult[0].disgust_score);
        should.exist(res.body.fetchResult[0].anger_score);
        should.exist(res.body.fetchResult[0].neutral_score);
        should.exist(res.body.fetchResult[0].surprise_score);
        should.exist(res.body.fetchResult[0].written_date);
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/searchresults/:providerId", () => {
  it("존재하지 않는 providerId의 일기를 검색하는 Test", (done) => {
    request(app)
      .post("/diaries/searchresults/4")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/searchresults/:providerId", () => {
  it("빈 컨텐츠를 검색하는 Test", (done) => {
    request(app)
      .post("/diaries/searchresults/906457842")
      .send({ content: "" })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("searchResult");
        should.exist(res.body.searchResult[0].id);
        should.exist(res.body.searchResult[0].emotion);
        should.exist(res.body.searchResult[0].content);
        should.exist(res.body.searchResult[0].providerId);
        should.exist(res.body.searchResult[0].hashtag_1);
        should.exist(res.body.searchResult[0].hashtag_2);
        should.exist(res.body.searchResult[0].hashtag_3);
        should.exist(res.body.searchResult[1].id);
        should.exist(res.body.searchResult[1].emotion);
        should.exist(res.body.searchResult[1].content);
        should.exist(res.body.searchResult[1].providerId);
        should.exist(res.body.searchResult[1].hashtag_1);
        should.exist(res.body.searchResult[1].hashtag_2);
        should.exist(res.body.searchResult[1].hashtag_3);
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/searchresults/:providerId", () => {
  it("존재하지 않는 값 검색 Test", (done) => {
    request(app)
      .post("/diaries/searchresults/906457842")
      .send({ content: "행복" })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("searchResult");
        should.not.exist(res.body.searchResult[0]);
        console.log(res.body);
        done();
      });
  });
});

describe("POST /diaries/searchresults/:providerId", () => {
  it("성공적인 검색 Test", (done) => {
    request(app)
      .post("/diaries/searchresults/906457842")
      .send({ content: "그녀" })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("searchResult");
        should.exist(res.body.searchResult[0].id);
        should.exist(res.body.searchResult[0].emotion);
        should.exist(res.body.searchResult[0].content);
        should.exist(res.body.searchResult[0].providerId);
        should.exist(res.body.searchResult[0].hashtag_1);
        should.exist(res.body.searchResult[0].hashtag_2);
        should.exist(res.body.searchResult[0].hashtag_3);
        console.log(res.body);
        done();
      });
  });
});

describe("DELETE /diaries/details/:Id", () => {
  it("존재하지 않는 일기를 삭제하는 Test", (done) => {
    request(app)
      .delete("/diaries/details/4575234231")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check Diary id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("DELETE /diaries/details/:Id", () => {
  it("일기를 정상적으로 삭제하는 Test", (done) => {
    request(app)
      .delete("/diaries/details/5")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.message.should.be.equal("Deleting diary is successfully done");
        console.log(res.body);
        done();
      });
  });
});
