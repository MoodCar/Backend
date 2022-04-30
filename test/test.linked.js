const request= require('supertest');
const app = require('../index');

describe('GET /', () => {
    it('Server Linked! 라는 응답이 와야 한다.', () =>{
        request(app)
        .get('/')
        .expect({"message":"Server Linked!"})
    })
})