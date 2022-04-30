const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbconfig.js");

// 데이터베이스 connection 객체 생성
exports.pool = mysql.createPool(dbConfig);