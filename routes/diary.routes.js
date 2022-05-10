module.exports = app =>{
    const diary = require("../controllers/diary.controller.js");

    app.get("/diaries",diary.findAll);
    

    app.post("/diaries/:providerId",diary.writeDiary);
    app.get("/diaries/:providerId",diary.fetchDiaryByProviderId);
    app.delete("/diaries/details/:id",diary.deleteDiary);
    app.get("/diaries/details/:id", diary.fetchDiaryDetailById);
    app.patch("/diaries/details/:id",diary.updateDiary);
};