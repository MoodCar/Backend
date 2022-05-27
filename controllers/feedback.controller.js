const feedback = require("../models/feedback.model.js");

function isEmpty(str) {
  if (typeof str == "undefined" || str == null || str == "") return true;
  else return false;
}

// 전체 감정 피드백
exports.getAllEmotionFeedback = async function (req, res) {
  const emotionFeedbackResult = await feedback.getEmotionFeedbackInfo();
  if (!emotionFeedbackResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get Information of Emotion Feedback",
    });
  }

  if (
    Array.isArray(emotionFeedbackResult) &&
    emotionFeedbackResult.length === 0
  ) {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Failed to get Information of Emotion Feedback(empty)",
    });
  }

  return res.status(200).send({
    emotionFeedbackResult,
    isSuccess: true,
    code: 200,
  });
};

// 전체 해시태그 피드백
exports.getAllHashtagFeedback = async function (req, res) {
  const hashtagFeedbackResult = await feedback.getHashtagFeedbackInfo();
  if (!hashtagFeedbackResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get Information of Hashtag Feedback",
    });
  }

  if (
    Array.isArray(hashtagFeedbackResult) &&
    hashtagFeedbackResult.length === 0
  ) {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Failed to get Information of Hashtag Feedback(empty)",
    });
  }

  return res.status(200).send({
    hashtagFeedbackResult,
    isSuccess: true,
    code: 200,
  });
};

// 감정 피드백 등록
exports.postEmotionFeedback = async function (req, res) {
  if (
    isEmpty(req.body.diary_content) ||
    isEmpty(req.body.emotion_original) ||
    isEmpty(req.body.emotion_changed)
  ) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check input.",
    });
  }
  const postResult = await feedback.postEmotionFeedback(
    req.body.diary_content,
    req.body.emotion_original,
    req.body.emotion_changed,
    req.body.opinion
  );
  if (!postResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to POST Emotion Feedback(postEmotionFeedback)",
    });
  }
  return res.status(200).send({
    message: "POST Emotion Feedback is successfully done",
    isSuccess: true,
    code: 200,
  });
};

// 해시태그 피드백 등록
exports.postHashtagFeedback = async function (req, res) {
  if (
    isEmpty(req.body.diary_content) ||
    isEmpty(req.body.hashtag1_original) ||
    isEmpty(req.body.hashtag1_changed) ||
    isEmpty(req.body.hashtag2_original) ||
    isEmpty(req.body.hashtag2_changed) ||
    isEmpty(req.body.hashtag3_original) ||
    isEmpty(req.body.hashtag3_changed)
  ) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check input.",
    });
  }

  const postResult = await feedback.postHashtagFeedback(
    req.body.diary_content,
    req.body.hashtag1_original,
    req.body.hashtag1_changed,
    req.body.hashtag2_original,
    req.body.hashtag2_changed,
    req.body.hashtag3_original,
    req.body.hashtag3_changed,
    req.body.opinion
  );
  if (!postResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to POST Hashtag Feedback(postHashtagFeedback)",
    });
  }
  return res.status(200).send({
    message: "POST Hashtag Feedback is successfully done",
    isSuccess: true,
    code: 200,
  });
};
