const Diary = require("../models/diary.model.js");

function isEmpty(str) {
  if (typeof str == "undefined" || str == null || str == "") return true;
  else return false;
}

// 일기 작성
exports.writeDiary = async function (req, res) {
  if (isEmpty(req.body.content)) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check content input.",
    });
  }
  const providerIdCheck = await Diary.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to write diary.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }

  const diaryDuplicateCheck = await Diary.diaryDuplicateCheck(
    req.params.providerId
  );
  if (!diaryDuplicateCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to write diary.(checkDiary)",
    });
  } else if (diaryDuplicateCheck == "duplicateCheck") {
    return res.status(409).send({
      isSuccess: false,
      code: 409,
      message: "You already wrote diary today.",
    });
  }

  const writeResult = await Diary.diaryWrite(
    req.params.providerId,
    req.body.content
  );
  if (!writeResult || writeResult == "fetchError") {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to write diary.(writeDiary)",
    });
  }

  return res.status(200).send({
    message: "Writing diary is successfully done",
    isSuccess: true,
    code: 200,
  });
};

// 일기 수정
exports.updateDiary = async function (req, res) {
  if (isEmpty(req.body.content)) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check content input.",
    });
  }

  const diaryIdCheck = await Diary.diaryIdCheck(req.params.id);
  if (!diaryIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update Diary.(diaryIdCheck)",
    });
  } else if (diaryIdCheck == "diaryIdCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check Diary id value.",
    });
  }

  const updateResult = await Diary.diaryUpdate(req.params.id, req.body.content);
  if (!updateResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update diary.(diaryUpdate)",
    });
  }
  return res.status(200).send({
    message: "Updating diary is successfully done",
    isSuccess: true,
    code: 200,
  });
};

// 일기 삭제
exports.deleteDiary = async function (req, res) {
  const diaryIdCheck = await Diary.diaryIdCheck(req.params.id);
  if (!diaryIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to delete diary.(diaryIdCheck)",
    });
  } else if (diaryIdCheck == "diaryIdCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check Diary id value.",
    });
  }

  const deleteResult = await Diary.diaryDelete(req.params.id);
  if (!deleteResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to delete diary.(diaryDelete)",
    });
  }

  return res.status(200).send({
    deleteResult,
    message: "Deleting diary is successfully done",
    isSuccess: true,
    code: 200,
  });
};

// providerId별 일기 목록 가져오기
exports.fetchDiaryByProviderId = async function (req, res) {
  const providerIdCheck = await Diary.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to fetch diary.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }
  const fetchResult = await Diary.getDiaryByProviderId(req.params.providerId);
  if (!fetchResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get diary.(getDiaryByProviderId)",
    });
  } else if (Array.isArray(fetchResult) && fetchResult.length === 0) {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Diary doesn't exist.",
    });
  }
  return res.status(200).send({
    fetchResult,
    isSuccess: true,
    code: 200,
  });
};

// 해당 일기의 세부 내용 가져오기
exports.fetchDiaryDetailById = async function (req, res) {
  const diaryIdCheck = await Diary.diaryIdCheck(req.params.id);
  if (!diaryIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get diary detail.(diaryIdCheck)",
    });
  } else if (diaryIdCheck == "diaryIdCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check Diary id value.",
    });
  }

  const fetchResult = await Diary.getDiaryById(req.params.id);
  if (!fetchResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get diary detail.(getDiaryById)",
    });
  }
  return res.status(200).send({
    fetchResult,
    isSuccess: true,
    code: 200,
  });
};

// 전체 일기 목록 가져오기
exports.findAll = async function (req, res) {
  const getAllResult = await Diary.getAll();
  if (!getAllResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get diaries.(getAll)",
    });
  } else if (Array.isArray(getAllResult) && getAllResult.length === 0) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "There is no diary in Diary table.",
    });
  }
  return res.status(200).send({
    getAllResult,
    isSuccess: true,
    code: 200,
  });
};

// 일기 검색
exports.searchDiary = async function (req, res) {
  const providerIdCheck = await Diary.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to search diary.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }

  const searchResult = await Diary.getSearchResult(
    req.params.providerId,
    req.body.content
  );
  if (!searchResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to search Diary.(getSearchResult)",
    });
  }
  return res.status(200).send({
    searchResult,
    isSuccess: true,
    code: 200,
  });
};

exports.updateEmotion = async function (req, res) {
  if (isEmpty(req.body.emotion)) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check emotion input.",
    });
  }

  const diaryIdCheck = await Diary.diaryIdCheck(req.params.id);
  if (!diaryIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update emotion of diary.(diaryIdCheck)",
    });
  } else if (diaryIdCheck == "diaryIdCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check Diary id value.",
    });
  }

  const updateResult = await Diary.diaryEmotionUpdate(
    req.params.id,
    req.body.emotion
  );

  if (!updateResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update emotion of diary.(diaryEmotionUpdate)",
    });
  }
  return res.status(200).send({
    message: "Updating emotion of diary is successfully done",
    isSuccess: true,
    code: 200,
  });
};

exports.updateHashtag = async function (req, res) {
  if (
    isEmpty(req.body.hashtag_1) ||
    isEmpty(req.body.hashtag_2) ||
    isEmpty(req.body.hashtag_3)
  ) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check hashtag input.",
    });
  }

  const diaryIdCheck = await Diary.diaryIdCheck(req.params.id);
  if (!diaryIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update hashtag of diary.(diaryIdCheck)",
    });
  } else if (diaryIdCheck == "diaryIdCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check Diary id value.",
    });
  }

  const updateResult = await Diary.diaryHashtagUpdate(
    req.params.id,
    req.body.hashtag_1,
    req.body.hashtag_2,
    req.body.hashtag_3
  );
  if (!updateResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update hashtag of diary.(diaryHashtagUpdate)",
    });
  }
  return res.status(200).send({
    message: "Updating hashtag of diary is successfully done",
    isSuccess: true,
    code: 200,
  });
};

exports.getTodayInfo = async function (req, res) {
  const providerIdCheck = await Diary.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get today's diary info.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }

  const getTodayResult = await Diary.getDiaryToday(req.params.providerId);
  if (!getTodayResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get today's result.(getDiaryToday)",
    });
  } else if (getTodayResult == "Success") {
    console.log("Success");
    return res.status(201).send({
      isSuccess: true,
      code: 201,
      message: "No diary is written today. continue to write diary.",
    });
  }

  return res.status(200).send({
    getTodayResult,
    message: "Today's diary already exists.",
    isSuccess: true,
    code: 200,
  });
};
