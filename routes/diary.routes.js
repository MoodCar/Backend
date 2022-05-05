module.exports = app =>{
    const diary = require("../controllers/diary.controller.js");

    app.post("/diaries/:providerId",diary.writeDiary);
    app.delete("/diaries/details/:id",diary.deleteDiary);
    app.get("/diaries/:providerId",diary.fetchDiary);
};