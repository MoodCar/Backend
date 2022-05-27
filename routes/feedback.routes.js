module.exports = (app) => {
  const feedback = require("../controllers/feedback.controller.js");

  // 전체 감정 피드백
  app.get("/feedbacks/emotions", feedback.getAllEmotionFeedback);
  // 전체 해시태그 피드백
  app.get("/feedbacks/hashtags", feedback.getAllHashtagFeedback);
  // 감정 피드백 등록
  app.post("/feedbacks/emotions", feedback.postEmotionFeedback);
  // 해시태그 피드백 등록
  app.post("/feedbacks/hashtags", feedback.postHashtagFeedback);
};
