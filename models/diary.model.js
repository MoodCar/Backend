const { pool } = require("./db.js");
const axios = require("axios");

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

async function test() {
  await sleep(7000);
}

// dummy data. 모델 연결 안되어있을 시 사용
let dummy_emotion = "행복";
let dummy_hashtag_1 = "강의";
let dummy_hashtag_2 = "영화";
let dummy_hashtag_3 = "떡볶이";
let dummy_happy_score = 56.3;
let dummy_fear_score = 11.2;
let dummy_disgust_score = 5.1;
let dummy_anger_score = 1.3;
let dummy_neutral_score = 21.1;
let dummy_surprise_score = 2.7;
let dummy_sad_score = 2.3;

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
      /* 나중에 모델 배포시 실제 ngrok 주소 넣어야함.
      const response = await axios.post("http://33a640b59dsadasd5c.ngrok.io/prediction", {
        content: content,
      });*/
      test();
      try {
        const writeDiaryQuery =
          "INSERT INTO diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3) values (?,?,?,?,?,?)";
        /* 실제 코드
          let params = [
          providerId,
          content,
          response.data.emotion,
          response.data.hashtag_1,
          response.data.hashtag_2,
          response.data.hashtag_3,
        ];*/
        // 더미데이터
        let params = [
          providerId,
          content,
          dummy_emotion,
          dummy_hashtag_1,
          dummy_hashtag_2,
          dummy_hashtag_3,
        ];
        let [row] = await connection.query(writeDiaryQuery, params);
        let insertId = row.insertId;
        const putEmotionScoreQuery =
          "insert into emotion_score(diary_id,happy_score,fear_score,disgust_score,anger_score,neutral_score,surprise_score,sad_score) values (?,?,?,?,?,?,?,?)";
        params = [insertId, dummy_happy_score,dummy_fear_score,dummy_disgust_score,dummy_anger_score,dummy_neutral_score,dummy_surprise_score,dummy_sad_score];
        // params = [insertId, response.data.happy_score, response.data.fear_score,response.data.disgust_score,response.data.anger_score,response.data.neutral_score,response.data.surprise_score,response.data.sad_score];
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
      /* 나중에 모델 배포시 실제 ngrok 주소 넣어야함.
      const response = await axios.post("http://33a640b59d1232135c.ngrok.io/prediction", {
        content: content,
      });*/
      test();
      try {
        const updateDiaryQuery =
          "update diary set content = ?,emotion = ?, hashtag_1 = ?, hashtag_2 = ?,hashtag_3 = ? where Id = ? ";
        /* let params = [
          content,
          response.data.emotion,
          response.data.hashtag_1,
          response.data.hashtag_2,
          response.data.hashtag_3,
          Id,
        ];*/
        let params = [
          content,
          dummy_emotion,
          dummy_hashtag_1,
          dummy_hashtag_2,
          dummy_hashtag_3,
          Id
        ]
        await connection.query(updateDiaryQuery, params);
        const updateEmotionScoreQuery = 
        " update emotion_score set happy_score = ?,fear_score = ?,disgust_score = ?,anger_score = ?,neutral_score = ?,surprise_score = ?,sad_score = ? where Id = ?";
        params = [dummy_happy_score,dummy_fear_score,dummy_disgust_score,dummy_anger_score,dummy_neutral_score,dummy_surprise_score,dummy_sad_score,Id];
        //params = [response.data.happy_score, response.data.fear_score,response.data.disgust_score,response.data.anger_score,response.data.neutral_score,response.data.surprise_score,response.data.sad_score, Id];
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
      const getDiaryQuery = "select * from diary where providerId = ?";
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
      const getDiaryByIdQuery = "select * from diary where Id = ?";
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
      const getAllQuery = "select * from diary";
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


exports.getSearchResult = async function (providerId,content) {
  try{
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try{
      const diarySearchQuery = "select id,providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3,written_date from diary where providerId = ? and content like ?";
      content = "%" + content + "%";
      let params = [providerId,content];
      let [row] = await connection.query(diarySearchQuery,params);
      connection.release();
      return row;
    }catch(err){
      console.error(`##### Query error ##### `);
      connection.release();
      return false;
    }
  }catch(err){
    console.error(`##### DB error #####`);
    return false;
  }
}


//일기 감정 수정
exports.diaryEmotionUpdate = async function(id, emotion) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const updateEmotionDiaryQuery =
        "update diary set emotion=? where id = ?";
      let params = [emotion, id];
      let [row] = await connection.query(updateEmotionDiaryQuery, params);
      if(row.changedRows === 1){
        params = id;
        const getUpdatedEmotionQuery =
        "select id,content,emotion from diary where id = ?";
        [row] = await connection.query(getUpdatedEmotionQuery, params);
        connection.release();
        return row;
      }else{
        connection.release();
        return "UpdateFail";
      }
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
exports.diaryHashtagUpdate = async function(id, hashtag_1,hashtag_2,hashtag_3) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      let hashtagBeforeList = [];
      const getHashtagsBeforeQuery = 
        "select hashtag_1,hashtag_2,hashtag_3 from diary where id = ?";
      let parameter = [id];
      let [result] = await connection.query(getHashtagsBeforeQuery, parameter);
      hashtagBeforeList.push(result[0]['hashtag_1']);
      hashtagBeforeList.push(result[0]['hashtag_2']);
      hashtagBeforeList.push(result[0]['hashtag_3']);
  
      let hashtagAfterList = [];
      hashtagAfterList.push(hashtag_1);
      hashtagAfterList.push(hashtag_2);
      hashtagAfterList.push(hashtag_3);
      
      
      let dupArray = false;
        for(let i = 0; i < hashtagAfterList.length; i++){
          const currElem = hashtagAfterList[i];
          for(let j = i+1; j < hashtagAfterList.length; j++){
            if(currElem === hashtagAfterList[j]) {
              dupArray = true;
              break;
            }
          }
      }
      if(dupArray){
        connection.release();
        return "dupArray";
      }

      hashtagBeforeList.sort();
      hashtagAfterList.sort();
      
      const sameArray = (JSON.stringify(hashtagBeforeList) === JSON.stringify(hashtagAfterList));
      if(sameArray){
        connection.release();
        return "sameArray";
      }

      const updateHashtagDiaryQuery =
        "update diary set hashtag_1=?,hashtag_2=?,hashtag_3=? where id = ?";
      let params = [hashtag_1,hashtag_2,hashtag_3,id];
      let [row] = await connection.query(updateHashtagDiaryQuery, params);
      if(row.changedRows === 1){
        params = id;
        const getUpdatedHashtagQuery =
        "select id,content,hashtag_1,hashtag_2,hashtag_3 from diary where id = ?";
        [row] = await connection.query(getUpdatedHashtagQuery, params);
        connection.release();
        return row;
      }else{
        connection.release();
        return "UpdateFail";
      }
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