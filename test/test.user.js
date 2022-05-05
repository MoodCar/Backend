const request= require('supertest');
const app = require('../index');
const should = require("should");


describe('GET /users', () => {
    it('유저 목록을 가져온다.', (done) =>{
        request(app)
        .get('/users')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body).should.have.property('userInfo');
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            should.exist(res.body.userInfo[0].email);
            console.log(res.body);
            done();
        });
    });
});
