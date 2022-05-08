const request= require('supertest');
const app = require('../index');
const should = require("should");


describe('GET /users', () => {
    it('전체 유저 목록을 가져온다.', (done) =>{
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
            should.exist(res.body.userInfo[0].name);
            should.exist(res.body.userInfo[0].provider);
            should.exist(res.body.userInfo[0].providerId);
            should.exist(res.body.userInfo[0].token);
            should.not.exist(res.body.userInfo[4]);
            console.log(res.body);
            done();
        });
    });
});

describe('GET /users/:providerId', () => {
    it('잘못된 providerId로 유저정보를 가져온다.(실패)', (done) =>{
        request(app)
        .get('/users/123124435123')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body).should.not.have.property('fetchResult');
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check id value.");
            console.log(res.body);
            done();
        });
    });
});


describe('GET /users/:providerId', () => {
    it('특정 유저 정보를 성공적으로 가져온다.', (done) =>{
        request(app)
        .get('/users/123124435')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body).should.have.property('fetchResult');
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            should.exist(res.body.fetchResult[0].email);
            should.exist(res.body.fetchResult[0].name);
            should.exist(res.body.fetchResult[0].provider);
            should.exist(res.body.fetchResult[0].providerId);
            should.exist(res.body.fetchResult[0].email);
            should.not.exist(res.body.fetchResult[1]);
            console.log(res.body);
            done();
        });
    });
});


