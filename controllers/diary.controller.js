const {Diary,idValid,diaryIdValid,contentExist} = require("../models/diary.model.js");
const sql = require("../models/db.js");
// Diary 작성
exports.write = (req, res)=> {
    const diary = new Diary(req.body);
    sql.query("select * from user where providerId = ?",req.params.providerId,(err2,res2)=>{
        if(res2.length === 0){
            res.json({
                isSuccess: false,
                code: 404,
                message: "ID does not exist."
            })
        }else{
            if(diary.content === ""){
                res.json({
                    isSuccess: false,
                    code: 400,
                    message: "Please write a diary content."
                })
            }else{
                sql.query("select * from diary where providerId = ? and written_date = curdate()",
                req.params.providerId,(err,res3)=>{
                if(res3.length !== 0){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "You already wrote today's diary."
                    })
                }else{
                     Diary.write(req.params.providerId, diary,(err,data) => {
                        if(err){
                            res.status(400).send({
                                message:
                                err.message || "Diary request error"
                            });
                        }
                        else res.json({
                            isSuccess: true,
                            code: 200
                            })
                        });
                    }
                })
            }
        }
    });
  
};

// 일기 작성(수정본)
exports.write2 = (req, res)=> {
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

// Diary 사용자 아이디 별 조회
exports.findById = (req,res) => {
    const idvalid = new idValid(req.body);
    idValid.validate(req.params.providerId,idvalid,(err,data)=>{
        if(err){
            res.json({
                isSuccess: false,
                code: 400,
                message: "request to get diary by providerId is incorrect or corrupt"
            });
        }
        if(data === 0){
            res.json({
                isSuccess: false,
                code: 404,
                message: "ID does not exist"
            })
        }else{
            Diary.noList(req.params.providerId,(err,data2)=>{
                if(err){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "request to get diary by providerId is incorrect or corrupt"
                    });
                }
                if(data2 === 0){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "There is no diary list"
                    });
                }else{
                    Diary.getById(req.params.providerId,(err,data3) => {
                        if(err){
                            res.json({
                                isSuccess: false,
                                code: 400,
                                message: "request to get diary by providerId is incorrect or corrupt"
                            });
                        }else{
                            res.json({
                                isSuccess: true,
                                code: 200,
                                data3
                            });
                        }
                    });             
                }
            });
        }
    });
};