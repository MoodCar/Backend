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
