module.exports = app =>{
    const diary = require("../controllers/diary.controller.js");

    app.post("/diaries/:providerId",diary.write);
  
    
};