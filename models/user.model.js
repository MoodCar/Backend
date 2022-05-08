const {pool} = require("./db.js");

// 전체 유저의 정보 조회

exports.getAllUser = async function(){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`##### Connection_pool_GET #####`);
        try{
            const getUserQuery = "SELECT * FROM user";
            const [row] = await connection.query(getUserQuery);
            connection.release();
            return row;
        } catch(err){
            console.error(`##### Query error ##### `);
            connection.release();
            return false;
        }

    }catch(err){
        console.error(`##### DB error #####`);
        return false;
    }
};

// providerId 유효성 체크
exports.providerIdCheck = async function (providerId) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        const idValidationQuery = "select * from user where providerId = ?";
        let params = providerId;
        let [row] = await connection.query(idValidationQuery, params);
        if (Array.isArray(row) && row.length === 0) {
          connection.release();
          return "idCheck";
        } else {
          connection.release();
          return true;
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

exports.fetchUserInfo = async function(providerId){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`##### Connection_pool_GET #####`);
        try{
            const fetchUserInfoQuery = "select * from user where providerId = ?"
            const params = providerId;
            const [row] = await connection.query(fetchUserInfoQuery,params);
            connection.release();
            return row;
        }catch(err){
            console.error(`##### Query error ##### `);
            connection.release();
            return false;
        }
    }catch(err){
        console.error(`##### DB error #####`);
        return false;
    }
}