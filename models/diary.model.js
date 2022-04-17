const sql = require("./db.js");

const Diary = function(diary){
    this.providerId = diary.providerId;
    this.content = diary.content;
}

Diary.write = (providerId,diary,result)=>{
    sql.query("INSERT INTO diary(providerId,content) values (?,?)",
    [providerId,diary.content],(err, res)=>{
      if (err) {
        res.status(400).send({
            message:
            err.message || "일기 작성 요청 오류"
        });
      } 
    console.log("diary:",res.insertId);
    result(null, res.insertId);
    });
};

module.exports = Diary;