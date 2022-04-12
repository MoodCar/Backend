const sql = require("./db.js");

const User = function(user){
    this.email = user.email;
    this.location = user.location;
    this.auth = user.auth;
}

// User 전체 조회
User.getAll = (result) =>{
    sql.query('SELECT * FROM user',(err,res) => {
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }

        console.log("user:",res);
        result(null,res);
    });
};

// User 아이디 별 조회
User.getById = (id, result)=>{
    sql.query("Select * from user where id = ? ", id, (err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("user:",res);
      result(null, res);
    });
};

// User 아이디 별 삭제
User.delete = (id, result)=>{
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("user:",res);
      result(null, res);
    });
};

// User 등록
User.create = (user, result)=>{
    sql.query("INSERT INTO user set ?", user,(err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
    console.log("user:",res.insertId);
    result(null, res.insertId);
    });
};

// User 정보 수정
User.updateById = (id,user, result)=>{
    sql.query("UPDATE user set password = ?,location=? where id = ?",[user.password,user.location,id],(err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
    console.log("user:",{id:id, ...user});
    result(null, {id:id, ...user});
    });
};

module.exports = User;