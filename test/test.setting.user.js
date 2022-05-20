const { pool } = require("../models/db.js");

async function setTest() {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(`##### Connection_pool_GET #####`);
    console.log(1);
    try {
      console.log(2);
      const setTestUserQuery =
        "insert ignore into user(email,name,provider,providerId,token) values ('46nklnszc@gmail.com','테스트4','google','785681234','43btvny981y98cn1noihjnroiqw')";
      await connection.query(setTestUserQuery);
      connection.release();
      console.log(3);
      process.exit(1);
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
}
setTest();
