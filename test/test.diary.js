const request = require("supertest");
const app = require("../index");
const should = require("should");
const { pool } = require("../models/db.js");

let Content = { content: "그녀의 모습을 목격하는 순간부터 내 가슴은 땅울림처럼 떨리고, 입안은 사막처럼 바싹 말라버린다." };
let updateContent = { content : "너와 함께라면 나는 언제나 행복해"};

async function setTest() {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`##### Connection_pool_GET #####`);
        try{
            const setTestQuery = "alter table diary auto_increment = 4";
            await connection.query(setTestQuery);
        }catch{
            console.error(`##### Query error ##### `);
      connection.release();
      return false;
        }
    }catch{
        console.error(`##### DB error #####`);
    return false;
    }
    
}

setTest();


describe('GET /diaries/:providerId', () => {
    it('존재하지 않는 사용자의 일기목록을 가져오는 Test', (done) =>{
        request(app)
        .get('/diaries/238470982750914324')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check id value.");
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/details/:Id', () => {
    it('존재하지 않는 일기의 세부 내용을 가져오는 Test', (done) =>{
        request(app)
        .get('/diaries/details/238470982750914324')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check Diary id value.");
            console.log(res.body);
            done();
        });
    });
});

describe('PATCH /diaries/details/:Id', () => {
    it('존재하지 않는 일기를 수정하는 Test', (done) =>{
        request(app)
        .patch('/diaries/details/238470982750914324')
        .send(Content)
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check Diary id value.");
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/:providerId', () => {
    it('작성된 일기가 없는 사용자의 일기목록 가져오는 Test', (done) =>{
        request(app)
        .get('/diaries/785681234')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Diary doesn't exist.");
            console.log(res.body);
            done();
        });
    });
});

describe('POST /diaries/:providerId', () => {
    it('일기 작성 Test (존재하지 않는 providerId test.)', (done) =>{
        request(app)
        .post('/diaries/1231231124435')
        .send(Content)
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check id value.");
            console.log(res.body);
            done();
        });
    });
});

describe('POST /diaries/:providerId', () => {
    it('일기 작성 Test (잘못된 Content)', (done) =>{
        request(app)
        .post('/diaries/785681234')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(400);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Please check content input.");
            console.log(res.body);
            done();
        });
    });
});

describe('POST /diaries/:providerId', () => {
    it('성공적인 일기 작성 Test', (done) =>{
        request(app)
        .post('/diaries/785681234')
        .send(Content)
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.message).should.be.equal('Writing diary is successfully done');
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            console.log(res.body);
            done();
        });
    });
});


describe('POST /diaries/:providerId', () => {
    it('일기 중복 작성 Test', (done) =>{
        request(app)
        .post('/diaries/785681234')
        .send(Content)
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(409);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("You already wrote diary today.");
            console.log(res.body);
            done();
        });
    });
});

describe('PATCH /diaries/:providerId', () => {
    it('일기 수정 실패 Test(잘못된 Content)', (done) =>{
        request(app)
        .patch('/diaries/details/4')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(400);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Please check content input.");
            console.log(res.body);
            done();
        });
    });
});
/*
describe('PATCH /diaries/:providerId', () => {
    it('일기 수정 실패 Test(동일한 Content)', (done) =>{
        request(app)
        .patch('/diaries/details/4')
        .send(Content)
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(409);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Can't Update. (original value and updating value is same)");
            console.log(res.body);
            done();
        });
    });
});
*/
describe('PATCH /diaries/:providerId', () => {
    it('일기 수정 성공 Test', (done) =>{
        request(app)
        .patch('/diaries/details/4')
        .send(updateContent)
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.message).should.be.equal("Updating diary is successfully done");
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            console.log(res.body);
            done();
        });
    });
});



describe('GET /diaries/:providerId', () => {
    it('일기 목록을 성공적으로 가져오는 Test', (done) =>{
        request(app)
        .get('/diaries/785681234')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            (res.body).should.have.property('fetchResult');
            should.exist(res.body.fetchResult[0].id);
            should.exist(res.body.fetchResult[0].emotion);
            should.exist(res.body.fetchResult[0].content);
            should.exist(res.body.fetchResult[0].providerId);
            should.exist(res.body.fetchResult[0].hashtag_1);
            should.exist(res.body.fetchResult[0].hashtag_2);
            should.exist(res.body.fetchResult[0].hashtag_3);
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/details/:Id', () => {
    it('일기의 세부 내용을 성공적으로 가져오는 Test', (done) =>{
        request(app)
        .get('/diaries/details/4')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            (res.body).should.have.property('fetchResult');
            should.exist(res.body.fetchResult[0].id);
            should.exist(res.body.fetchResult[0].emotion);
            should.exist(res.body.fetchResult[0].content);
            should.exist(res.body.fetchResult[0].providerId);
            should.exist(res.body.fetchResult[0].hashtag_1);
            should.exist(res.body.fetchResult[0].hashtag_2);
            should.exist(res.body.fetchResult[0].hashtag_3);
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/searchresults/:providerId', () => {
    it('존재하지 않는 providerId의 일기를 검색하는 Test', (done) =>{
        request(app)
        .get('/diaries/searchresults/4')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check id value.");
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/searchresults/:providerId', () => {
    it('빈 컨텐츠를 검색하는 Test', (done) =>{
        request(app)
        .get('/diaries/searchresults/906457842')
        .send({content : ""})
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            (res.body).should.have.property('searchResult');
            should.exist(res.body.searchResult[0].id);
            should.exist(res.body.searchResult[0].emotion);
            should.exist(res.body.searchResult[0].content);
            should.exist(res.body.searchResult[0].providerId);
            should.exist(res.body.searchResult[0].hashtag_1);
            should.exist(res.body.searchResult[0].hashtag_2);
            should.exist(res.body.searchResult[0].hashtag_3);
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/searchresults/:providerId', () => {
    it('존재하지 않는 값 검색 Test', (done) =>{
        request(app)
        .get('/diaries/searchresults/906457842')
        .send({content : "행복"})
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            (res.body).should.have.property('searchResult');
            should.not.exist(res.body.searchResult[0]);
            console.log(res.body);
            done();
        });
    });
});

describe('GET /diaries/searchresults/:providerId', () => {
    it('성공적인 검색 Test', (done) =>{
        request(app)
        .get('/diaries/searchresults/906457842')
        .send({content : "그녀"})
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            (res.body).should.have.property('searchResult');
            should.exist(res.body.searchResult[0].id);
            should.exist(res.body.searchResult[0].emotion);
            should.exist(res.body.searchResult[0].content);
            should.exist(res.body.searchResult[0].providerId);
            should.exist(res.body.searchResult[0].hashtag_1);
            should.exist(res.body.searchResult[0].hashtag_2);
            should.exist(res.body.searchResult[0].hashtag_3);
            console.log(res.body);
            done();
        });
    });
});

describe('DELETE /diaries/details/:Id', () => {
    it('존재하지 않는 일기를 삭제하는 Test', (done) =>{
        request(app)
        .delete('/diaries/details/4575234231')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(404);
            (res.body.isSuccess).should.be.equal(false);
            (res.body.message).should.be.equal("Check Diary id value.");
            console.log(res.body);
            done();
        });
    });
});



describe('DELETE /diaries/details/:Id', () => {
    it('일기를 정상적으로 삭제하는 Test', (done) =>{
        request(app)
        .delete('/diaries/details/4')
        .end((err,res) => {
            if(err){
                throw err;
            }
            (res.body.code).should.be.equal(200);
            (res.body.isSuccess).should.be.equal(true);
            (res.body.message).should.be.equal("Deleting diary is successfully done");
            console.log(res.body);
            done();
        });
    });
});