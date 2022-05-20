const request = require("supertest");
const app = require("../index");
const should = require("should");


let emotionFeedback = {
  diary_content : "역시 눈이 큰 여자아이라든지, 손가락이 절대적으로로 예쁜 여자아이라든지, 잘은 모르겠지만 천천히 식사하는 여자아이에게 끌린다든지와 같은 식의. 나에게도 물론 그런 기호는 있다.",
  emotion_original : "행복",
  emotion_changed : "중립",
  opinion : "감정 내용이 잘못된것같아요."
}

let hashtagFeedback = {
  diary_content : "역시 눈이 큰 여자아이라든지, 손가락이 절대적으로로 예쁜 여자아이라든지, 잘은 모르겠지만 천천히 식사하는 여자아이에게 끌린다든지와 같은 식의. 나에게도 물론 그런 기호는 있다.",
  hashtag1_original : "여행",
  hashtag1_changed : "여자아이",
  hashtag2_original : "스페인",
  hashtag2_changed : "식사",
  hashtag3_original : "독서",
  hashtag3_changed : "손가락",
  opinion : "해시태그 내용이 잘못된것같아요."
}

describe("GET /feedbacks/emotions", () => {
  it("감정 피드백을 불러오는데 실패하는 Test(감정 피드백이 존재하지 않음)", (done) => {
    request(app)
      .get("/feedbacks/emotions")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Failed to get Information of Emotion Feedback(empty)");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /feedbacks/hashtags", () => {
  it("해시태그 피드백을 불러오는데 실패하는 Test(해시태그 피드백이 존재하지 않음)", (done) => {
    request(app)
      .get("/feedbacks/hashtags")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Failed to get Information of Hashtag Feedback(empty)");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /feedbacks/emotions", () => {
  it("감정 피드백을 등록하는데 실패하는 Test(피드백 데이터 없는경우)", (done) => {
    request(app)
      .post("/feedbacks/emotions")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(400);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Please check input.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /feedbacks/hasthags", () => {
  it("해시태그 피드백을 등록하는데 실패하는 Test(피드백 데이터 없는경우)", (done) => {
    request(app)
      .post("/feedbacks/hashtags")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(400);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Please check input.");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /feedbacks/emotions", () => {
  it("감정 피드백을 등록하는데 성공하는 Test", (done) => {
    request(app)
      .post("/feedbacks/emotions")
      .send(emotionFeedback)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.message.should.be.equal("POST Emotion Feedback is successfully done");
        console.log(res.body);
        done();
      });
  });
});

describe("POST /feedbacks/hashtags", () => {
  it("해시태그 피드백을 등록하는데 성공하는 Test", (done) => {
    request(app)
      .post("/feedbacks/hashtags")
      .send(hashtagFeedback)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.message.should.be.equal("POST Hashtag Feedback is successfully done");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /feedbacks/emotions", () => {
  it("감정 피드백을 불러오는데 성공하는 Test", (done) => {
    request(app)
      .get("/feedbacks/emotions")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("emotionFeedbackResult");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /feedbacks/hashtags", () => {
  it("해시태그 피드백을 불러오는데 성공하는 Test", (done) => {
    request(app)
      .get("/feedbacks/hashtags")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.should.have.property("hashtagFeedbackResult");
        console.log(res.body);
        done();
      });
  });
});