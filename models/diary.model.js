const sql = require("./db.js");

const Diary = function(diary){
    this.providerId = diary.providerId;
    this.content = diary.content;
}

const idValid = function(idvalid){
  this.valid = idvalid.valid;
}

idValid.validate = (providerId,idvalid,result)=>{
  sql.query("select * from user where providerId = ?",providerId,(err,res)=>{
    if(res.length === 0){
      idvalid.valid = 0;
      result(null,idvalid.valid);
    }else{
      idvalid.valid = 1;
      result(null,idvalid.valid);
    }
  });
};

const diaryIdValid = function(diaryidvalid){
  this.valid = diaryidvalid.valid;
}

diaryIdValid.validate = (id,diaryidvalid,result)=>{
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

module.exports = {
  Diary,
  idValid,
  diaryIdValid,
  contentExist
};