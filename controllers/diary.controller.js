const {Diary,idValid,diaryIdValid,contentExist} = require("../models/diary.model.js");
const sql = require("../models/db.js");


// 일기 작성(수정본)
exports.write = (req, res)=> {
    const diary = new Diary(req.body);
    const idvalid = new idValid(req.body);
    idValid.validate(req.params.providerId,idvalid,(err,data)=>{
        if(err){
            res.json({
                isSuccess: false,
                code: 400,
                message: "request to create diary is incorrect or corrupt"
            });
        }
        if(data === 0){
            res.json({
                isSuccess: false,
                code: 404,
                message: "ID does not exist"
            })
        }else{
            const contentexist = new contentExist(req.body);
            contentExist.isExist(req.body.content,contentexist,(err,data2)=>{
                if(err){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "request to create diary is incorrect or corrupt"
                    });
                }
                if(data2 === 0){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "Please write a diary content"
                    })
                }else{
                    Diary.alreadyExist(req.params.providerId,(err,data3)=>{
                        if(err){
                            res.json({
                                isSuccess: false,
                                code: 400,
                                message: "request to create diary is incorrect or corrupt"
                            });
                        }
                        if(data3 === 0){
                            res.json({
                                isSuccess: false,
                                code: 400,
                                message: "You already wrote a diary today"
                            })
                        }else{
                            Diary.write2(req.params.providerId, diary,(err,data4) => {
                                if(err){
                                    res.json({
                                        isSuccess: false,
                                        code: 400,
                                        message: "request to create diary is incorrect or corrupt"
                                    });
                                }
                                else res.json({
                                    isSuccess: true,
                                    code: 200,
                                    data4
                                    })
                                });
                        }
                    })
                }
            });
        }
    })
};

// Diary 아이디 별 삭제
exports.delete = (req,res) => {
    const diaryidvalid = new diaryIdValid(req.body);
    diaryIdValid.validate(req.params.id,diaryidvalid,(err,data)=>{
        if(err){
            res.json({
                isSuccess: false,
                code: 400,
                message: "request to delete diary by diaryID is incorrect or corrupt"
            });
        }
        if(data === 0){
            res.json({
                isSuccess: false,
                code: 404,
                message: "Diary ID does not exist"
            })
        }else{
            Diary.delete(req.params.id, (err,data2) => {
                if(err){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "request to delete diary by diaryID is incorrect or corrupt"
                    });
                }else{
                    res.json({
                        isSuccess: true,
                        code: 200,
                        data2
                    });
                }
            });     
        }
    });
};