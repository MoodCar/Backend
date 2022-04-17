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


module.exports = User;