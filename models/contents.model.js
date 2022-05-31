const { pool } = require("./db.js");

exports.getAllContent = async function () {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        const getAllContentQuery = "select * from content";
        let [row] = await connection.query(getAllContentQuery);
        connection.release();
        return row;
      } catch (err){
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    } catch (err){
      console.error(`##### DB error #####`);
      console.log(err);
      return false;
    }
  };


  exports.contentIdCheck = async function(id) {
    try{
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try{
        const contentIdValidationQuery = "select * from content where id = ?";
        let params = [id];
        let [row] = await connection.query(contentIdValidationQuery,params);
        if (Array.isArray(row) && row.length === 0) {
          connection.release();
          return "contentIdCheck";
        } else {
          connection.release();
          return true;
        }
      }catch (err){
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    }catch (err){
      console.error(`##### DB error #####`);
      console.log(err);
      return false;
    }
  };

  exports.contentDelete = async function (id) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        const deleteContentQuery = "delete from content where id = ?";
        let params = [id];
        let [row] = await connection.query(deleteContentQuery,params);
        if (row.affectedRows == 1) {
          connection.release();
          return true;
        } else {
          connection.release();
          return false;
        }
      } catch (err){
        console.error(`##### Query error ##### `);
        console.log(err);
        connection.release();
        return false;
      }
    } catch (err){
      console.error(`##### DB error #####`);
      console.log(err);
      return false;
    }
  };


