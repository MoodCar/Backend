const request= require('supertest');
const app = require('../index');
const assert = require("assert");


let invalidContent = { "content" : "안녕하세요"};

describe('POST /diaries', () => {
    it('일기 작성 Test (존재하지 않는 providerId test.)', async() =>{
        request(app)
        .post('/diaries/1231231124435')
        .expect('Content-Type',/json/)
        .expect(404)
        .expect(function(err,res){
            if(err) throw err;
            assert.equal(res.body,{
                isSuccess : false,
                code : 404,
                message : "Check id value."
              });
        })
    })
})

describe('POST /diaries', () => {
    it('일기 작성 Test (잘못된 Content)', async() =>{
        request(app)
        .post('/diaries/785681234')
        .expect('Content-Type',/json/)
        .expect(400)
        .expect(function(err,res){
            if(err) throw err;
            assert.equal(res.body,{
                isSuccess : false,
                code : 400,
                message : "Please check content input."
              });
        })
        request(app)
        .post('/diaries/785681234')
        .send(invalidContent)
        .expect('Content-Type',/json/)
        .expect(400)
        .expect(function(err,res){
            if(err) throw err;
            assert.equal(res.body,{
                isSuccess : false,
                code : 400,
                message : "Please check content input."
              });
        })
    })
})


describe('POST /diaries', () => {
    it('성공적인 일기 작성 Test', async() =>{
        request(app)
        .post('/diaries/785681234')
        .expect('Content-Type',/json/)
        .expect(200)
        .expect(function(err,res){
            if(err) throw err;
            assert.equal(res.body.isSuccess,true);
            assert.notEqual(res.body.diaryResult,[]);
        })
    })
})

describe('POST /diaries', () => {
    it('일기 중복 작성 Test (하루에 1개 초과 작성)', async() =>{
        request(app)
        .post('/diaries/785681234')
        .expect('Content-Type',/json/)
        .expect(409)
        .expect(function(err,res){
            if(err) throw err;
            assert.equal(res.body,{
                isSuccess : false,
                code : 409,
                message : "You already wrote diary today."
              });
        })
    })
})
