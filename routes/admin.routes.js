const axios = require('axios');

module.exports = app =>{

    app.get("/admin", (req, res) => {
        res.render('manage');
    });

    app.get("/admin/diaries", (req, res) => {
        axios.get("http://localhost:3000/diaries")
            .then(response => {
                res.render('diaryList', {
                    title: 'Diary List',
                    diaries: response.data.getAllResult
                })
            })
            .catch(error => {
                console.log('error: ', error);
            })
    });

    app.get("/admin/diaries/details/:id", (req, res) => {
        axios.delete(`http://localhost:3000/diaries/details/${req.params.id}`)
            .then(response => {
                console.log(response.data.deleteResult);
                res.redirect('/admin/diaries');
            })
            .catch(error => {
                console.log('error: ', error);
            })
    });

    app.get("/admin/users", (req, res) => {
        axios.get("http://localhost:3000/users")
            .then(response => {
                res.render('userList', {
                    title: 'User List',
                    users: response.data.userInfo
                })
            })
            .catch(error => {
                console.log('error: ', error);
            })
    });

    app.get("/admin/users/details/:providerId", (req, res) => {
        axios.delete(`http://localhost:3000/users/${req.params.providerId}`)
            .then(response => {
                console.log(response.data.deleteResult);
                res.redirect('/admin/users');
            })
            .catch(error => {
                console.log('error: ', error);
            })
    });

};