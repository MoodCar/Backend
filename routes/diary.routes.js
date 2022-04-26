module.exports = app =>{
    const diary = require("../controllers/diary.controller.js");

    app.post("/diaries/:providerId",diary.write);
    app.delete("/diaries/details/:id",diary.delete);
    app.get("/diaries/:providerId",diary.findById);
};