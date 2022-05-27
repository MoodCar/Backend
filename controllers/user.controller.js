const User = require("../models/user.model.js");

function isEmpty(str) {
  if (typeof str == "undefined" || str == null || str == "") return true;
  else return false;
}

// 전체 유저의 정보 조회
exports.findAll = async function (req, res) {
  const userInfo = await User.userGetAll();
  if (!userInfo) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to get Information of Users",
    });
  }

  if (Array.isArray(userInfo) && userInfo.length === 0) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Failed to get Information of Users(empty)",
    });
  }

  return res.status(200).send({
    userInfo,
    isSuccess: true,
    code: 200,
  });
};

// 특정 유저의 정보 조회
exports.getUserInfo = async function (req, res) {
  const providerIdCheck = await User.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to fetch user info.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }

  const fetchResult = await User.userFetchInfo(req.params.providerId);
  if (!fetchResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to fetch user info.(fetchUserInfo)",
    });
  }

  return res.status(200).send({
    fetchResult,
    message: "Fetching User Information is successfully done",
    isSuccess: true,
    code: 200,
  });
};

// 유저 삭제
exports.deleteUser = async function (req, res) {
  const providerIdCheck = await User.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to fetch user info.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }

  const deleteResult = await User.userDelete(req.params.providerId);
  if (!deleteResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to delete user.(userDelete)",
    });
  }

  return res.status(200).send({
    deleteResult,
    message: "Deleting user is successfully done",
    isSuccess: true,
    code: 200,
  });
};

// 유저 업데이트
exports.updateUserInfo = async function (req, res) {
  if (isEmpty(req.body.location) || isEmpty(req.body.preference)) {
    return res.status(400).send({
      isSuccess: false,
      code: 400,
      message: "Please check input.",
    });
  }

  const providerIdCheck = await User.providerIdCheck(req.params.providerId);
  if (!providerIdCheck) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update User Info.(providerIdCheck)",
    });
  } else if (providerIdCheck == "idCheck") {
    return res.status(404).send({
      isSuccess: false,
      code: 404,
      message: "Check id value.",
    });
  }

  const updateResult = await User.userUpdate(
    req.params.providerId,
    req.body.location,
    req.body.preference
  );
  if (!updateResult) {
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "Failed to update User Info.(updateUser)",
    });
  } else if (updateResult == "updateFail") {
    return res.status(409).send({
      isSuccess: false,
      code: 409,
      message: "Can't Update. (original value and updating value is same)",
    });
  }

  return res.status(200).send({
    updateResult,
    message: "Updating User Information is successfully done",
    isSuccess: true,
    code: 200,
  });
};
