const { pool } = require("./db.js");
const axios = require("axios");

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

// 일기 작성
exports.diaryWrite = async function (providerId, content) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const response = await axios.post("http://33a640b59dsadasd5c.ngrok.io/prediction", {
        content: content,
      });
      try {
        const writeDiaryQuery =
          "INSERT INTO diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3) values (?,?,?,?,?,?)";
        let params = [
          providerId,
          content,
          response.data.emotion,
          response.data.hashtag_1,
          response.data.hashtag_2,
          response.data.hashtag_3,
        ];
        let [row] = await connection.query(writeDiaryQuery, params);
        params = row.insertId;
        const getInsertedDiaryQuery =
          "select id,content,emotion,hashtag_1,hashtag_2,hashtag_3 from diary where id = ?";
        [row] = await connection.query(getInsertedDiaryQuery, params);
        connection.release();
        return row;
      } catch (err) {
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    } catch (err) {
      console.error(`##### Axios Error ##### `);
      console.log(err);

      // Dummy data. colab 서버 작동안할때는 임의의 더미데이터 집어넣어줌
      let hashtag_1 = "스케이트";
      let hashtag_2 = "독서";
      let hashtag_3 = "공부";
      let emotion = "행복";
      const writeDiaryQuery =
          "INSERT INTO diary(providerId,content,emotion,hashtag_1,hashtag_2,hashtag_3) values (?,?,?,?,?,?)";
      let params = [
        providerId,
        content,
        emotion,
        hashtag_1,
        hashtag_2,
        hashtag_3,
      ];
        let [row] = await connection.query(writeDiaryQuery, params);
        params = row.insertId;
        const getInsertedDiaryQuery =
          "select id,content,emotion,hashtag_1,hashtag_2,hashtag_3 from diary where id = ?";
        [row] = await connection.query(getInsertedDiaryQuery, params);
        connection.release();
        return row;
      
      //return "fetchError";
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
      const response = await axios.post("http://33a640b59d1232135c.ngrok.io/prediction", {
        content: content,
      });
      try {
        const updateDiaryQuery =
          "update diary set content = ?,emotion = ?, hashtag_1 = ?, hashtag_2 = ?,hashtag_3 = ? where Id = ? ";
        let params = [
          content,
          response.data.emotion,
          response.data.hashtag_1,
          response.data.hashtag_2,
          response.data.hashtag_3,
          Id,
        ];
        let [row] = await connection.query(updateDiaryQuery, params);
        if (row.changedRows == 1) {
          params = Id;
          const getUpdatedDiaryQuery =
            "select id,content,emotion,hashtag_1,hashtag_2,hashtag_3 from diary where id = ?";
          [row] = await connection.query(getUpdatedDiaryQuery, params);
          connection.release();
          return row;
        } else {
          connection.release();
          return "UpdateFail";
        }
      } catch (err) {
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    } catch (err) {
      console.error(`##### Axios Error ##### `);
      console.log(err);

      // Dummy data. colab 서버 작동안할때는 임의의 더미데이터 집어넣어줌
      let hashtag_1 = "스케이트";
      let hashtag_2 = "독서";
      let hashtag_3 = "공부";
      let emotion = "행복";

      const updateDiaryQuery =
          "update diary set content = ?,emotion = ?, hashtag_1 = ?, hashtag_2 = ?,hashtag_3 = ? where Id = ? ";
        let params = [
          content,
          emotion,
          hashtag_1,
          hashtag_2,
          hashtag_3,
          Id,
        ];
        let [row] = await connection.query(updateDiaryQuery, params);
        if (row.changedRows == 1) {
          params = Id;
          const getUpdatedDiaryQuery =
            "select id,content,emotion,hashtag_1,hashtag_2,hashtag_3 from diary where id = ?";
          [row] = await connection.query(getUpdatedDiaryQuery, params);
          connection.release();
          return row;
        } else {
          connection.release();
          return "UpdateFail";
        }
      //return "fetchError";
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
      const diarySearchQuery = "select * from diary where providerId = ? and content like ?";
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