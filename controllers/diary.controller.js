const Diary = require("../models/diary.model.js");
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
                req.params.providerId,(err3,res3)=>{
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