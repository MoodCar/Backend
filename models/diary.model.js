const { pool } = require("./db.js");
const axios = require("axios");

exports.diaryCheck = async function (providerId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    try {
      const idValidationQuery = "select * from user where providerId = ?";
      let params = [providerId];
      let [row] = await connection.query(idValidationQuery, params);
      if (!row) {
        connection.release();
        return "idCheck";
      }
      try {
        const duplicateCheckQuery =
          "select * from diary where providerId = ? and written_date = curdate()";
        let params = [providerId];
        let [row] = await connection.query(duplicateCheckQuery, params);
        if (Array.isArray(row) && row.length === 0) {
          connection.release();
          return true;
        } else {
          connection.release();
          return "duplicateCheck";
        }
      } catch {
        console.error(`##### Query error ##### `);
        connection.release();
        return false;
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

exports.diaryWrite = async function (providerId, content) {
  axios
    .post("http://3.34.209.23:5000/prediction", {
      content: content,
    })
    .then((response) => {
      if (!response) {
        return false;
      } else {
        try {
          const connection = pool.getConnection(async (conn) => conn);
          console.log(`##### Connection_pool_GET #####`);
          try {
            const writeDiaryQuery =
              "INSERT INTO diary(providerId,content,emotion) values (?,?,?)";
            const params = [providerId, content, response.data.emotion];
            let [row] = connection.query(writeDiaryQuery, params);
            console.log(content);
            console.log(providerId);
            console.log(row);
            if (!row) {
              connection.release();
              return false;
            } else {
              connection.release();
              return row;
            }
          } catch {
            console.log('a');
            console.error(`##### Query error ##### `);
            connection.release();
            return false;
          }
        } catch {
          console.error(`##### DB error #####`);
          return false;
        }
      }

      /*Diary.updateEmotion(data,response.data.emotion,(err) =>{
      if(err){
        res.json({
          isSuccess: false,
          code: 400,
          message: "request to create diary is incorrect or corrupt",
        });
      }
      else{
        res.json({
          isSuccess: true,
          code: 200,
          emotion: response.data.emotion,
        });
      }
    })*/
    });
};

/*diaryIdValid.validate = (id,diaryidvalid,result)=>{
  sql.query("select * from diary where id = ?",id,(err,res)=>{
    if(res.length === 0){
      diaryidvalid.valid = 0;
      result(null,diaryidvalid.valid);
    }else{
      diaryidvalid.valid = 1;
      result(null,diaryidvalid.valid);
    }
  });
};

const contentExist = function(contentexist){
  this.exist = contentexist.exist;
}

contentExist.isExist = (content,contentexist,result) =>{
  if(content === ""){
    contentexist.exist = 0;
    result(null,contentexist.exist);
  }else{
    contentexist.exist = 1;
    result(null,contentexist.exist);
  }
};

Diary.alreadyExist = (providerId,result) =>{
  sql.query("select * from diary where providerId = ? and written_date = curdate()",providerId,(err,res)=>{
    if(res.length !== 0){
      result(null,0);
    }else{
      result(null,1);
    }
  });
};

Diary.noList = (providerId,result) =>{
  sql.query("Select * from diary where providerId = ?",providerId,(err,res)=>{
    if(res.length === 0){
      result(null,0);
    }else{
      result(null,1);
    }
  });
};

Diary.write = (providerId,diary,result)=>{
  sql.query("INSERT INTO diary(providerId,content) values (?,?)",
  [providerId,diary.content],(err, res)=>{
  if(err){
      res.json({
        isSuccess: false,
        code: 400,
        message: "request to create diary is incorrect or corrupt"
      });
  }
  //console.log("diary:",res.insertId);
  result(null, res.insertId);
  });
};

Diary.delete = (id, result)=>{
  sql.query("DELETE FROM diary WHERE id = ?", id, (err, res)=>{
    if(err){
      res.json({
        isSuccess: false,
        code: 400,
        message: "request to delete diary by diaryID is incorrect or corrupt"
      });
    }
    //console.log("diary:",res);
    result(null, res);
  });
};

Diary.getById = (providerId, result)=>{
  sql.query("Select * from diary where providerId = ? ", providerId, (err, res)=>{
    if(err){
      res.json({
        isSuccess: false,
        code: 400,
        message: "request to get diary by providerId is incorrect or corrupt"
      });
    }
    console.log("diary by providerId:",res);
    result(null, res);
  });
};

Diary.updateEmotion = (id,emotion,result) => {
  sql.query("update diary set emotion = ? where id = ?",[emotion,id],(err,res) => {
    if(err){
      res.json({
        isSuccess : false,
        code : 400,
        message : "request to update emotion by diaryId is incorrect or corrupt"
      });
    }
    result(null,res);
  });
};

module.exports = {
  Diary,
  idValid,
  diaryIdValid,
  contentExist
};*/
