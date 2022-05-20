const { pool } = require("../models/db.js");

async function setTest() {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const setDropEmotionQuery = "DROP TABLE if exists feedback_emotion";
      await connection.query(setDropEmotionQuery);
      const setDropHashtagQuery = "DROP TABLE if exists feedback_hashtag";
      await connection.query(setDropHashtagQuery);
      const setCreateEmotionQuery =
        "CREATE TABLE feedback_emotion( id INT NOT NULL AUTO_INCREMENT, diary_content VARCHAR(10000) NOT NULL, emotion_original VARCHAR(20),emotion_changed VARCHAR(20),opinion VARCHAR(2000),PRIMARY KEY (id))";
      await connection.query(setCreateEmotionQuery);
      const setCreateHashtagQuery =
        "CREATE TABLE feedback_hashtag(id INT NOT NULL AUTO_INCREMENT,diary_content VARCHAR(10000) NOT NULL,hashtag1_original VARCHAR(20),hashtag2_original VARCHAR(20),hashtag3_original VARCHAR(20),hashtag1_changed VARCHAR(20),hashtag2_changed VARCHAR(20),hashtag3_changed VARCHAR(20),opinion VARCHAR(2000),PRIMARY KEY (id))";
      await connection.query(setCreateHashtagQuery);
      connection.release();
      console.log("Test setting is done!");
      process.exit(1);
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

setTest();
