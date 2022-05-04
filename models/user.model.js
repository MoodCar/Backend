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