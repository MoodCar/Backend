module.exports = app =>{
    const admin = require("../controllers/admin.controller.js");

    app.get("/admin",admin.manage);

    app.get("/admin/diaries",admin.diaries);
    app.get("/admin/diaries/:providerId",admin.fetchUserByProviderId);
    app.post("/admin/diaries/update/:id",admin.updateDiary);
    app.get("/admin/diaries/updatePage/:id",admin.updateDiaryPage);
    app.get("/admin/diaries/details/:id",admin.deleteDiary);

    app.get("/admin/users",admin.users);
    app.post("/admin/users/update/:providerId",admin.updateUser);
    app.get("/admin/users/updatePage/:providerId",admin.updateUserPage);
    app.get("/admin/users/delete/:providerId",admin.deleteUser);
};