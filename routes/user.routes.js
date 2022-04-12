module.exports = app =>{
    const users = require("../controllers/user.controller.js");

    app.get("/users",users.findAll);
    app.get("/users/:id",users.findById);
    app.delete("/users/:id",users.delete);
    app.post("/users",users.create);
    app.patch("/users/:id",users.updateById);
};