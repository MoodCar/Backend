const User = require("../models/user.model.js");


// User 전체 조회
exports.findAll = (req,res) => {
    User.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users"
            });
        }
        else res.send(data);
    });
};

// User 아이디 별 조회
exports.findById = (req,res) => {
    User.getById(req.params.id, (err,data) => {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users"
            });
        }
        else res.send(data);
    });
};

// User 아이디 별 삭제
exports.delete = (req,res) => {
    User.delete(req.params.id, (err,data) => {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users"
            });
        }
        else res.send(data);
    });
};

// User 등록
exports.create = (req, res)=> {
    const user = new User(req.body);
    User.create(user, (err,data) => {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users"
            });
        }
        else res.send(user);
    });
};

// User 아이디 별 수정
exports.updateById = (req,res) => {
    User.updateById(req.params.id,new User(req.body),(err,data) => {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users"
            });
        }
        else res.send(data);
    });
};