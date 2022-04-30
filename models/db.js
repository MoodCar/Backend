const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbconfig.js");
let db_create;
if(process.env.NODE_ENV==='test'){
    db_create = dbConfig.test;
}
else{
    db_create = dbConfig.development;
}

// 데이터베이스 connection 객체 생성
exports.pool = mysql.createPool(db_create);