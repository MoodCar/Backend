const { pool } = require("./db.js");
const axios = require("axios");



function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// providerId 유효성 체크
exports.providerIdCheck = async function (providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const idValidationQuery = "select * from user where providerId = ?";
      let params = providerId;
      let [row] = await connection.query(idValidationQuery, params);
      if (Array.isArray(row) && row.length === 0) {
        connection.release();
        return "idCheck";
      } else {
        connection.release();
        return true;
      }
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

// providerId 중복 체크 (오늘 작성한 일기가 존재하는지)
exports.diaryDuplicateCheck = async function (providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const duplicateCheckQuery =
        "select * from diary where providerId = ? and written_date = curdate()";
      let params = providerId;
      let [row] = await connection.query(duplicateCheckQuery, params);
      if (Array.isArray(row) && row.length === 0) {
        connection.release();
        return true;
      } else {
        connection.release();
        return "duplicateCheck";
      }
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

// 존재하는 일기인지 체크
exports.diaryIdCheck = async function (Id) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const diaryIdValidationQuery = "select * from diary where id = ?";
      let params = Id;
      let [row] = await connection.query(diaryIdValidationQuery, params);
      if (Array.isArray(row) && row.length === 0) {
        connection.release();
        return "diaryIdCheck";
      } else {
        connection.release();
        return true;
      }
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

// 일기 작성
exports.diaryWrite = async function (providerId, content) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const response = await axios.post("http://3.39.173.28:5000/prediction", {
        content: content,
      });
      let emotion = response.data.emotion;
      let hashtag_1 = response.data.hashtag_0;
      let hashtag_2 = response.data.hashtag_1;
      let hashtag_3 = response.data.hashtag_2;
      let happy_score = response.data.happy_score;
      let fear_score = response.data.fear_score;
      let disgust_score = response.data.disgust_score;
      let anger_score = response.data.anger_score;
      let neutral_score = response.data.neutral_score;
      let surprise_score = response.data.suprise_score;
      let sad_score = response.data.sad_score;
      try {

        console.log("done!");
        const getEmotionCountQuery =
          "SELECT count(*) as count FROM content WHERE emotion = ?";
        let params = emotion;
        let [row] = await connection.query(getEmotionCountQuery, params);
        let count = row[0].count;
        let randNum = rand(1, count) - 1;
        const getContentQuery =
          "SELECT * FROM content WHERE emotion = ? limit ?,1";
        params = [emotion, randNum];
        [row] = await connection.query(getContentQuery, params);
        let contentNumber = row[0].id;

        const writeDiaryQuery =
          "INSERT INTO diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,contents_id) values (?,?,?,?,?,?,?)";
          params = [
          providerId,
          content,
          emotion,
          hashtag_1,
          hashtag_2,
          hashtag_3,
          contentNumber
        ];
        [row] = await connection.query(writeDiaryQuery, params);
        let insertId = row.insertId;
        const putEmotionScoreQuery =
          "insert into emotion_score(diary_id,happy_score,fear_score,disgust_score,anger_score,neutral_score,surprise_score,sad_score) values (?,?,?,?,?,?,?,?)";
        params = [
          insertId,
          happy_score,
          fear_score,
          disgust_score,
          anger_score,
          neutral_score,
          surprise_score,
          sad_score,
        ];
        await connection.query(putEmotionScoreQuery, params);
        connection.release();
        return "Success";
      } catch (err) {
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    } catch (err) {
      console.error(`##### Axios Error ##### `);
      console.log(err);
      connection.release();
      return "fetchError";
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    console.log(err);
    return false;
  }
};

// 일기 수정
exports.diaryUpdate = async function (Id, content) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const response = await axios.post("http://3.39.173.28:5000/prediction", {
        content: content,
      });
      let emotion = response.data.emotion;
      let hashtag_1 = response.data.hashtag_0;
      let hashtag_2 = response.data.hashtag_1;
      let hashtag_3 = response.data.hashtag_2;
      let happy_score = response.data.happy_score;
      let fear_score = response.data.fear_score;
      let disgust_score = response.data.disgust_score;
      let anger_score = response.data.anger_score;
      let neutral_score = response.data.neutral_score;
      let surprise_score = response.data.suprise_score;
      let sad_score = response.data.sad_score;
      try {
        const getEmotionCountQuery =
          "SELECT count(*) as count FROM content WHERE emotion = ?";
        let params = emotion;
        let [row] = await connection.query(getEmotionCountQuery, params);
        let count = row[0].count;
        let randNum = rand(1, count) - 1;
        const getContentQuery =
          "SELECT * FROM content WHERE emotion = ? limit ?,1";
        params = [emotion, randNum];
        [row] = await connection.query(getContentQuery, params);
        let contentNumber = row[0].id;

        const updateDiaryQuery =
          "update diary set content = ?,emotion = ?, hashtag_1 = ?, hashtag_2 = ?,hashtag_3 = ?,contents_id = ? where Id = ? ";
        params = [
          content,
          emotion,
          hashtag_1,
          hashtag_2,
          hashtag_3,
          contentNumber,
          Id,
        ];
        await connection.query(updateDiaryQuery, params);
        const updateEmotionScoreQuery =
          " update emotion_score set happy_score = ?,fear_score = ?,disgust_score = ?,anger_score = ?,neutral_score = ?,surprise_score = ?,sad_score = ? where diary_id = ?";
        params = [
          happy_score,
          fear_score,
          disgust_score,
          anger_score,
          neutral_score,
          surprise_score,
          sad_score,
          Id,
        ];
        await connection.query(updateEmotionScoreQuery, params);
        connection.release();
        return "Success";
      } catch (err) {
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    } catch (err) {
      console.error(`##### Axios Error ##### `);
      console.log(err);
      connection.release();
      return "fetchError";
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    console.log(err);
    return false;
  }
};

// 일기 삭제
exports.diaryDelete = async function (Id) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const deleteDiaryQuery = "delete from diary where id = ?";
      let params = Id;
      let [row] = await connection.query(deleteDiaryQuery, params);
      if (row.affectedRows == 1) {
        connection.release();
        return true;
      } else {
        connection.release();
        return false;
      }
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

// providerId별 일기 조회
exports.getDiaryByProviderId = async function (providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getDiaryQuery =
        "select d.id,d.providerId,d.content,d.emotion,e.happy_score,e.fear_score,e.disgust_score,e.anger_score,e.neutral_score,e.surprise_score,e.sad_score,d.contents_id,d.counselor_id,d.hashtag_1,d.hashtag_2,d.hashtag_3,d.written_date from diary as d left join emotion_score as e on d.id = e.diary_id where providerId = ?;";
      let params = providerId;
      let [row] = await connection.query(getDiaryQuery, params);
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

// Id별 일기 세부 내용 조회
exports.getDiaryById = async function (Id) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getDiaryByIdQuery =
        "select d.id,d.providerId,d.content,d.emotion,e.happy_score,e.fear_score,e.disgust_score,e.anger_score,e.neutral_score,e.surprise_score,e.sad_score,d.contents_id,d.counselor_id,d.hashtag_1,d.hashtag_2,d.hashtag_3,d.written_date from diary as d left join emotion_score as e on d.id = e.diary_id where d.id = ?;";
      let params = Id;
      let [row] = await connection.query(getDiaryByIdQuery, params);
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

// 전체 일기 목록 조회
exports.getAll = async function () {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getAllQuery =
        "select d.id,d.providerId,d.content,d.emotion,e.happy_score,e.fear_score,e.disgust_score,e.anger_score,e.neutral_score,e.surprise_score,e.sad_score,d.contents_id,d.counselor_id,d.hashtag_1,d.hashtag_2,d.hashtag_3,d.written_date from diary as d left join emotion_score as e on d.id = e.diary_id;";
      let [row] = await connection.query(getAllQuery);
      connection.release();
      return row;
    } catch {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch {
    console.error(`##### DB error #####`);
    return false;
  }
};

// 검색 결과 조회
exports.getSearchResult = async function (providerId, content) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const diarySearchQuery =
        "select id,providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,written_date from diary where providerId = ? and content like ?";
      content = "%" + content + "%";
      let params = [providerId, content];
      let [row] = await connection.query(diarySearchQuery, params);
      connection.release();
      return row;
    } catch (err) {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    return false;
  }
};

//일기 감정 수정
exports.diaryEmotionUpdate = async function (id, emotion) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getEmotionCountQuery =
        "SELECT count(*) as count FROM content WHERE emotion = ?";
      //let params = response.data.emotion;
      let params = emotion;
      let [row] = await connection.query(getEmotionCountQuery, params);
      let count = row[0].count;
      let randNum = rand(1, count) - 1;
      const getContentQuery =
        "SELECT * FROM content WHERE emotion = ? limit ?,1";
      params = [emotion, randNum];
      //params = [response.data.emotion, randNum];
      [row] = await connection.query(getContentQuery, params);
      let contentNumber = row[0].id;

      const updateEmotionDiaryQuery =
        "update diary set emotion=?, contents_id = ? where id = ?";
      params = [emotion, contentNumber, id];
      await connection.query(updateEmotionDiaryQuery, params);
      connection.release();
      return "Success";
    } catch {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch {
    console.error(`##### DB error #####`);
    return false;
  }
};

//일기 해시태그 수정
exports.diaryHashtagUpdate = async function (
  id,
  hashtag_1,
  hashtag_2,
  hashtag_3
) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const updateHashtagDiaryQuery =
        "update diary set hashtag_1=?,hashtag_2=?,hashtag_3=? where id = ?";
      let params = [hashtag_1, hashtag_2, hashtag_3, id];
      await connection.query(updateHashtagDiaryQuery, params);
      connection.release();
      return "Success";
    } catch {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch {
    console.error(`##### DB error #####`);
    return false;
  }
};

// 오늘 작성된 일기 존재여부
exports.getDiaryToday = async function (providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getDiaryWrittenTodayQuery =
        "select d.id,d.providerId,d.content,d.emotion,d.contents_id,c.type,c.name,c.publisher,c.url from diary as d left join content as c on d.contents_id = c.id where d.providerId = ? and d.written_date = curdate();";
      let params = providerId;
      const [row] = await connection.query(getDiaryWrittenTodayQuery, params);
      if (Array.isArray(row) && row.length === 0) {
        connection.release();
        return "Success";
      } else {
        connection.release();
        return row;
      }
    } catch (err) {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    return false;
  }
};

// 특정 사용자의 감정별 일기 개수
exports.getEmotionCount = async function (providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getEmotionCountQuery =
        "SELECT e.emotion, IFNULL(d.CNT, 0) AS 'count' FROM emotion AS e LEFT OUTER JOIN ( SELECT emotion, COUNT(*) AS CNT FROM diary where providerId = ? GROUP BY emotion ) AS d ON e.emotion = d.emotion ORDER BY e.emotion";
      let params = providerId;
      const [row] = await connection.query(getEmotionCountQuery, params);
      let fearCount = await row[0].count;
      let surpriseCount = await row[1].count;
      let angryCount = await row[2].count;
      let sadCount = await row[3].count;
      let neutralCount = await row[4].count;
      let happyCount = await row[5].count;
      let disgustCount = await row[6].count;
      let countResult = [];
      countResult.push({
        공포: fearCount,
        놀람: surpriseCount,
        분노: angryCount,
        슬픔: sadCount,
        중립: neutralCount,
        행복: happyCount,
        혐오: disgustCount,
      });
      connection.release();
      return countResult;
    } catch (err) {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    return false;
  }
};

// 특정 사용자의 감정에 따른 일기 목록
exports.getDiaryByEmotion = async function (emotion, providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const getDiaryByEmotionQuery =
        "SELECT id,providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,written_date from diary where providerId = ? and emotion = ?";
      let params = [providerId, emotion];
      const [row] = await connection.query(getDiaryByEmotionQuery, params);
      connection.release();
      return row;
    } catch (err) {
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`##### DB error #####`);
    return false;
  }
};
