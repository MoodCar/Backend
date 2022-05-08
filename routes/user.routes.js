module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  app.get("/users", users.findAll);
  app.get("/users/:providerId", users.getUserInfo);
  app.delete("/users/:providerId", users.deleteUser);
  app.patch("/users/:providerId", users.updateUserInfo);
};
