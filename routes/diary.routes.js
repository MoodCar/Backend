module.exports = app =>{
    const diary = require("../controllers/diary.controller.js");

    app.post("/diaries/:providerId",diary.writeDiary);
    app.get("/diaries/:providerId",diary.fetchDiary);
    app.delete("/diaries/details/:id",diary.deleteDiary);
    app.get("/diaries/details/:id", diary.fetchDiaryDetail);
};