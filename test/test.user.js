const request= require('supertest');
const app = require('../index');
const {pool} = require("../models/db.js");


describe('GET /users', () => {
    it('유저 목록을 가져와야 한다.', async() =>{
        await request(app)
        .get('/users')
        .expect('Content-Type',/json/)
        .expect(200)
        .expect({"userInfo":[{"email":"asd123@gmail.com","name":"테스트","provider":"google","providerId":"123124435","token":"qeklnklviqoebbzscklb12312445","auth":0,"reg_date":"2022-04-29T15:00:00.000Z"},{"email":"qwesad123@gmail.com","name":"테스트2","provider":"google","providerId":"435624563","token":"snklfnalknk123ehilg123756i1z","auth":0,"reg_date":"2022-04-29T15:00:00.000Z"},{"email":"bnlik4tn21@gmail.com","name":"테스트3","provider":"google","providerId":"906457842","token":"v2b98by98c189xhiu5ninanklas","auth":0,"reg_date":"2022-04-29T15:00:00.000Z"}],"isSuccess":true,"code":200})
    })
})
