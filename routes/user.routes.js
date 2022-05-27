module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // 전체 사용자 목록
  app.get("/users", users.findAll);
  // 특정 사용자 정보
  app.get("/users/:providerId", users.getUserInfo);
  // 사용자 삭제
  app.delete("/users/:providerId", users.deleteUser);
  // 사용자 정보 수정
  app.patch("/users/:providerId", users.updateUserInfo);
};
