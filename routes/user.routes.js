module.exports = app =>{
    const users = require("../controllers/user.controller.js");

    app.get("/users",users.findAll);
    app.get("/users/:providerId", users.getUser);
    app.delete("/users/:providerId", users.deleteUser);
    app.patch("/users/:providerId", users.updateUserInfo);
};