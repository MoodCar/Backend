const { pool } = require("./db.js");
const axios = require("axios");

exports.renderManage = async function () {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        return 'manage';
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

  exports.getAllDiaires = async function () {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        let Data = null; 
        await axios.get("http://localhost:3000/diaries")
        .then(response=>{
          Data =  response.data;
        })
        return Data;
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

  exports.getAllUsers = async function () {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        let Data = null; 
        await axios.get("http://localhost:3000/users")
        .then(response=>{
          Data =  response.data;
        })
        return Data;
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

  exports.fetchUserByProviderId = async function (providerId) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        let Data = null; 
        await axios.get(`http://localhost:3000/users/${providerId}`)
        .then(response=>{
          Data =  response.data;
        })
        return Data;
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

  exports.diaryUpdate = async function (id,content) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        await axios.patch(`http://localhost:3000/diaries/details/${id}`,{
          content: content
        })
        .then(response=>{
            console.log(response.data)
        })
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

  exports.fetchDiaryByDiaryId = async function (id) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        let Data = null; 
        await axios.get(`http://localhost:3000/diaries/info/${id}`)
        .then(response=>{
          Data =  response.data;
        })
        return Data;
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

  exports.diaryDelete = async function (id) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        await axios.delete(`http://localhost:3000/diaries/details/${id}`)
        .then(response=>{
            console.log(response.data)
        })
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

  exports.userUpdate = async function (providerId,location,preference) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        await axios.patch(`http://localhost:3000/users/${providerId}`,{
          location: location,
          preference: preference
        })
        .then(response=>{
            console.log(response.data)
        })
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

  exports.fetchUserByProviderId = async function (providerId) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        let Data = null; 
        await axios.get(`http://localhost:3000/users/${providerId}`)
        .then(response=>{
          Data =  response.data;
        })
        return Data;
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


  exports.userDelete = async function (providerId) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      console.log(`##### Connection_pool_GET #####`);
      try {
        await axios.delete(`http://localhost:3000/users/${providerId}`)
        .then(response=>{
            console.log(response.data)
        })
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