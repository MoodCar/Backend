const request= require('supertest');
const app = require('../index');
const should = require("should");

describe('GET /', () => {
    it('Server Linked! 라는 응답이 와야 한다.', (done) =>{
        request(app)
        .get('/')
        .end((err,res) => {
            if(err){
                throw err;
            }
            should.exist(res.body.message);
            (res.body.message).should.be.equal("Server Linked!");
            console.log(res.body);
            done();
        });
    });
});
