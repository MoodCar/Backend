module.exports = app =>{
    const diary = require("../controllers/diary.controller.js");

    //app.post("/diaries/:providerId",diary.write);
    app.post("/diaries/:providerId",diary.write2);
    app.delete("/diaries/details/:id",diary.delete);
};