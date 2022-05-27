const request = require("supertest");
const app = require("../index");
const should = require("should");

let updateInfo = {
  location: "서울",
  preference: "음악",
};

describe("GET /users", () => {
  it("전체 유저 목록을 가져온다.", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.have.property("userInfo");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
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

describe("GET /users/:providerId", () => {
  it("존재하지 않는 providerId로 유저정보를 가져오는 Test", (done) => {
    request(app)
      .get("/users/123124435123")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.not.have.property("fetchResult");
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("GET /users/:providerId", () => {
  it("특정 유저 정보를 성공적으로 가져오는 Test.", (done) => {
    request(app)
      .get("/users/123124435")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.have.property("fetchResult");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
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

describe("DELETE /users/:providerId", () => {
  it("존재하지 않는 유저를  삭제하는 Test.", (done) => {
    request(app)
      .delete("/users/785681235321234")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.not.have.property("deleteResult");
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /users", () => {
  it("존재하지 않는 유저의 정보를 수정하는 Test.", (done) => {
    request(app)
      .patch("/users/78568123412345")
      .send(updateInfo)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.not.have.property("updateResult");
        res.body.code.should.be.equal(404);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal("Check id value.");
        console.log(res.body);
        done();
      });
  });
});


describe("PATCH /users", () => {
  it("특정 유저의 정보를 수정하는 Test.", (done) => {
    request(app)
      .patch("/users/785681234")
      .send(updateInfo)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.have.property("updateResult");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        should.exist(res.body.updateResult[0].location);
        should.exist(res.body.updateResult[0].preference);
        console.log(res.body);
        done();
      });
  });
});

describe("PATCH /users", () => {
  it("특정 유저의 정보를 중복 수정하는 Test.", (done) => {
    request(app)
      .patch("/users/785681234")
      .send(updateInfo)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.not.have.property("updateResult");
        res.body.code.should.be.equal(409);
        res.body.isSuccess.should.be.equal(false);
        res.body.message.should.be.equal(
          "Can't Update. (original value and updating value is same)"
        );
        console.log(res.body);
        done();
      });
  });
});

describe("DELETE /users/:providerId", () => {
  it("특정 유저를 성공적으로 삭제하는 Test.", (done) => {
    request(app)
      .delete("/users/785681234")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.have.property("deleteResult");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        res.body.deleteResult.should.be.equal(true);
        console.log(res.body);
        done();
      });
  });
});

describe("GET /users", () => {
  it("전체 유저 목록을 가져온다.", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.body.should.have.property("userInfo");
        res.body.code.should.be.equal(200);
        res.body.isSuccess.should.be.equal(true);
        should.exist(res.body.userInfo[0].email);
        should.exist(res.body.userInfo[0].name);
        should.exist(res.body.userInfo[0].provider);
        should.exist(res.body.userInfo[0].providerId);
        should.exist(res.body.userInfo[0].token);
        should.not.exist(res.body.userInfo[3]);
        console.log(res.body);
        done();
      });
  });
});
