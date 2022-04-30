const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

// 데이터베이스 connection 객체 생성
const connection = mysql.createPool(dbConfig);



module.exports = connection;