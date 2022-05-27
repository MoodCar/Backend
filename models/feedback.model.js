const { pool } = require("./db.js");

// 전체 감정 피드백
exports.getEmotionFeedbackInfo = async function () {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      let getEmotionFeedbackQuery = "SELECT * FROM feedback_emotion";
      let [row] = await connection.query(getEmotionFeedbackQuery);
      connection.release();
      return row;
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
};

// 전체 해시태그 피드백
exports.getHashtagFeedbackInfo = async function () {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      let getHashtagFeedbackQuery = "SELECT * FROM feedback_hashtag";
      let [row] = await connection.query(getHashtagFeedbackQuery);
      connection.release();
      return row;
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
};

// 감정 피드백 등록
exports.postEmotionFeedback = async function (
  content,
  emotion_original,
  emotion_changed,
  opinion
) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      let postEmotionFeedbackQuery =
        "insert into feedback_emotion(diary_content,emotion_original,emotion_changed,opinion) values (?,?,?,?)";
      let params = [content, emotion_original, emotion_changed, opinion];
      let [row] = await connection.query(postEmotionFeedbackQuery, params);
      connection.release();
      return true;
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
};

// 해시태그 피드백 등록
exports.postHashtagFeedback = async function (
  content,
  hashtag1_original,
  hashtag1_changed,
  hashtag2_original,
  hashtag2_changed,
  hashtag3_original,
  hashtag3_changed,
  opinion
) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      let postEmotionFeedbackQuery =
        "insert into feedback_hashtag(diary_content,hashtag1_original,hashtag1_changed,hashtag2_original,hashtag2_changed,hashtag3_original,hashtag3_changed,opinion) values (?,?,?,?,?,?,?,?)";
      let params = [
        content,
        hashtag1_original,
        hashtag1_changed,
        hashtag2_original,
        hashtag2_changed,
        hashtag3_original,
        hashtag3_changed,
        opinion,
      ];
      await connection.query(postEmotionFeedbackQuery, params);
      connection.release();
      return true;
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
};
