const Diary = require("../models/diary.model.js");
const sql = require("../models/db.js");
// Diary 작성
exports.write = (req, res)=> {
    const diary = new Diary(req.body);
    sql.query("select * from user where providerId = ?",req.params.providerId,(err2,res2)=>{
        if(res2.length === 0){
            res.json({
                isSuccess: false,
                code: 400,
                message: "존재하지 않는 아이디입니다."
            })
        }else{
            if(diary.content === ""){
                res.json({
                    isSuccess: false,
                    code: 400,
                    message: "일기 내용을 작성해주시기 바랍니다."
                })
            }else{
                sql.query("select * from diary where providerId = ? and written_date = curdate()",
                req.params.providerId,(err3,res3)=>{
                if(res3.length !== 0){
                    res.json({
                        isSuccess: false,
                        code: 400,
                        message: "이미 오늘 일기를 작성하셨습니다."
                    })
                }else{
                     Diary.write(req.params.providerId, diary,(err,data) => {
                        if(err){
                            res.status(400).send({
                                message:
                                err.message || "일기 작성 요청 오류"
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