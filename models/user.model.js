const {pool} = require("./db.js");

// 전체 유저의 정보 조회

exports.userGetAll = async function(){
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
      } catch(err) {
        console.error(`##### Query error ##### `);
        connection.release();
        return false;
      }
    } catch(err) {
      console.error(`##### DB error #####`);
      return false;
    }
  };

exports.userFetchInfo = async function(providerId){
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

exports.userDelete = async function(providerId){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`##### Connection_pool_GET #####`);
        try{
            const deleteUserQuery = "delete from user where providerId = ?";
      let params = providerId;
      let [row] = await connection.query(deleteUserQuery, params);
      if (row.affectedRows == 1) {
        connection.release();
        return true;
      } else {
        connection.release();
        return false;
      }
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

exports.userUpdate = async function(providerId,location,preference){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`##### Connection_pool_GET #####`);
        try{
            let updateUserQuery = "update user set location = ?, preference = ? where providerId = ?";
            let params = [location,preference,providerId];
            let [row] = await connection.query(updateUserQuery,params);
            if(row.changedRows == 1){
                params = providerId;
                let getUserQuery = "select location,preference from user where providerId = ?";
                [row] = await connection.query(getUserQuery,params);
                connection.release();
                return row;
            }
            else{
                connection.release();
                return "updateFail";
            }
        }catch(err){
            console.error(`##### Query error ##### `);
            console.log(err);
            connection.release();
            return false;
        }
    }catch(err){
        console.error(`##### DB error #####`);
        return false;
    }
}