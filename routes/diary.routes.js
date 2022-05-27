module.exports = (app) => {
  const diary = require("../controllers/diary.controller.js");

  // 전체 일기 목록
  app.get("/diaries", diary.findAll);
  // 일기 작성
  app.post("/diaries/:providerId", diary.writeDiary);
  // 사용자별 일기 목록
  app.get("/diaries/:providerId", diary.fetchDiaryByProviderId);
  // 일기 삭제
  app.delete("/diaries/details/:id", diary.deleteDiary);
  // 해당 일기의 세부 정보
  app.get("/diaries/details/:id", diary.fetchDiaryDetailById);
  // 일기 내용 수정
  app.patch("/diaries/details/:id", diary.updateDiary);
  // 일기 검색
  app.post("/diaries/searchresults/:providerId", diary.searchDiary);
  // 오늘 작성된 일기 여부
  app.get("/diaries/today/:providerId", diary.getTodayInfo);
  // 일기 감정 수정
  app.patch("/diaries/emotions/:id", diary.updateEmotion);
  // 일기 해시태그 수정
  app.patch("/diaries/hashtags/:id", diary.updateHashtag);
  // 특정 사용자의 감정별 일기 개수
  app.get("/diaries/emotioncounts/:providerId", diary.fetchEmotionCount);
  //특정 사용자의 감정별 일기 목록
  app.post("/diaries/emotions/:providerId", diary.getDiaryByEmotion);
};
