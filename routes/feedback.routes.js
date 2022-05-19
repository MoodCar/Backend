module.exports = (app) => {
  const feedback = require("../controllers/feedback.controller.js");

  app.get("/feedbacks/emotions", feedback.getAllEmotionFeedback);
  app.get("/feedbacks/hashtags", feedback.getAllHashtagFeedback);
  app.post("/feedbacks/emotions", feedback.postEmotionFeedback);
  app.post("/feedbacks/hashtags", feedback.postHashtagFeedback);
};
