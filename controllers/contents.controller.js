const Contents = require("../models/contents.model.js");

exports.findAllContent = async function (req,res){

    const getAllResult = await Contents.getAllContent();
    if(!getAllResult){
      return res.status(500).send({
        isSuccess : false,
        code : 500,
        message : "Failed to get all contents.(getAll)"
      })
    }

    if (
      Array.isArray(getAllResult) &&
      getAllResult.length === 0
    ) {
      return res.status(404).send({
        isSuccess: false,
        code: 404,
        message: "Failed to get all contents(empty)",
      });
    }

    return res.status(200).send({
      getAllResult,
      message: 'Getting all Contents is successfully done',
      isSuccess : true,
      code : 200,
    })
  }


  exports.deleteContent = async function (req,res){

    const contentIdCheck = await Contents.contentIdCheck(req.params.id);
    if (!contentIdCheck) {
      return res.status(500).send({
        isSuccess: false,
        code: 500,
        message: "Failed to delete Content.(contentIdCheck)",
      });
    } else if (contentIdCheck == "contentIdCheck") {
      return res.status(404).send({
        isSuccess: false,
        code: 404,
        message: "Check Content id value.",
      });
    }
  
    const deleteResult = await Contents.contentDelete(req.params.id);
    if (!deleteResult) {
      return res.status(500).send({
        isSuccess: false,
        code: 500,
        message: "Failed to delete Content.(deleteContent)",
      });
    }

    return res.status(200).send({
      deleteResult,
      message: 'Deleting content is successfully done',
      isSuccess : true,
      code : 200,
    })
  }

