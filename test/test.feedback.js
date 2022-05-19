const request = require("supertest");
const app = require("../index");
const should = require("should");
const { pool } = require("../models/db.js");

async function setTest() {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const setDropEmotionQuery = "DROP TABLE if exists feedback_emotion";
      await connection.query(setDropEmotionQuery);
      const setDropHashtagQuery = "DROP TABLE if exists feedback_emotion";
      await connection.query(setDropHashtagQuery);
      const setCreateEmotionQuery =
        "CREATE TABLE feedback_emotion( id INT NOT NULL AUTO_INCREMENT, diary_content VARCHAR(10000) NOT NULL, emotion_original VARCHAR(20),emotion_changed VARCHAR(20),opinion VARCHAR(2000),PRIMARY KEY (id))";
      await connection.query(setCreateEmotionQuery);
      const setCreateHashtagQuery =
        "CREATE TABLE feedback_hashtag(id INT NOT NULL AUTO_INCREMENT,diary_content VARCHAR(10000) NOT NULL,hashtag1_original VARCHAR(20),hashtag2_original VARCHAR(20),hashtag3_original VARCHAR(20),hashtag1_changed VARCHAR(20),hashtag2_changed VARCHAR(20),hashtag3_changed VARCHAR(20),opinion VARCHAR(2000),PRIMARY KEY (id))";
      await connection.query(setCreateHashtagQuery);
      console.log("Test Setting is Successfully Done!");
      connection.release();
    } catch (err) {
      console.error(`##### Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    console.log(err);
    return false;
  }
}
async function testSetting() {
  await setTest();
  console.log("Test Setting");
}
testSetting();

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
        res.body.isSuccess.should.be.equal(true);
        res.body.message.should.be.equal("Failed to get Information of Emotion Feedback(empty)");
        console.log(res.body);
        done();
      });
  });
});