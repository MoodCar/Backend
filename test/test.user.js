const request= require('supertest');
const app = require('../index');
const assert = require("assert");


describe('GET /users', () => {
    it('유저 목록을 가져온다.', async() =>{
        await request(app)
        .get('/users')
        .expect('Content-Type',/json/)
        .expect(200)
        .expect(function(err,res){
            if(err) throw err;
            assert.equal(res.body.isSuccess,true);
            assert.notEqual(res.body.userInfo,[]);
        })
    })
})
