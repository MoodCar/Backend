const Admin = require("../models/admin.model.js");

exports.manage = async function (req,res){
    const page = await Admin.renderManage();
    res.render(page);
  }

exports.diaries = async function (req,res){
    const diaries = await Admin.getAllDiaires();
    res.render('diaryList',{
      title: 'Diary List',
      diaries: diaries['getAllResult']
    })
  }

exports.users = async function (req,res){
    const users = await Admin.getAllUsers();
    res.render('userList',{
      title: 'User List',
      users: users['userInfo']
    })
  }

  exports.fetchUserByProviderId = async function (req,res){
    const user = await Admin.fetchUserByProviderId(req.params.providerId);
    if(!user){
        return res.status(404).send({
            isSuccess: false,
            code: 404,
            message: "There is no user in User Table whose providerId is " + req.params.providerId,
          });
    }

    res.render('userInfo_providerId',{
        title: 'User Information',
        user: user['fetchResult']
      })
  }

  exports.updateDiary = async function (req,res){
    const updateResult = await Admin.diaryUpdate(req.params.id,req.body.content);
    console.log(updateResult);
    res.redirect('/admin/diaries');
}

exports.updateDiaryPage = async function (req,res){
    const diary = await Admin.fetchDiaryByDiaryId(req.params.id);
    if(!diary){
        return res.status(404).send({
            isSuccess: false,
            code: 404,
            message: "There is no diary in Diary Table which id is " + req.params.id,
          });
    }

    res.render('updateDiary',{
        title: 'Update Diary Information',
        diary: diary['fetchResult']
      })
  }

  exports.deleteDiary = async function (req,res){
    const deleteResult = await Admin.diaryDelete(req.params.id);
    console.log(deleteResult);
    res.redirect('/admin/diaries');
  }

  exports.updateUser = async function (req,res){
    const updateResult = await Admin.userUpdate(req.params.providerId,req.body.location,req.body.preference);
    console.log(updateResult);
    res.redirect('/admin/users');
  }

  exports.updateUserPage = async function (req,res){
    const user = await Admin.fetchUserByProviderId(req.params.providerId);
    if(!user){
        return res.status(404).send({
            isSuccess: false,
            code: 404,
            message: "There is no user in User Table whose providerId is " + req.params.providerId,
          });
    }

    res.render('updateUser',{
        title: 'Update User Information',
        user: user['fetchResult']
      })
  }

  exports.deleteUser = async function (req,res){
    const deleteResult = await Admin.userDelete(req.params.providerId);
    console.log(deleteResult);
    res.redirect('/admin/users');
  }