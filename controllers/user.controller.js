const User = require("../models/user.model.js");


// 전체 유저의 정보 조회
exports.findAll = async function(req,res) {

    const userInfo = await User.getAllUser();
    if (!userInfo){
        return res.status(500).send({
            isSuccess : false,
            code : 500,
            message : "Failed to get Information of Users"
        })
    }

    if(Array.isArray(userInfo) && userInfo.length === 0){
        return res.status(400).send({
            isSuccess : false,
            code : 400,
            message : "Failed to get Information of Users(empty)"
        })
    }

    return res.status(200).send({
        userInfo,
        isSuccess : true,
        code : 200,
    })
};
