const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
test('Post a valid puzzle and get response', function (done) {
     let input= {puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."};
  chai
    .request(server)
    .post("/api/solve")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.solution).to.match(/[0-9]{81}$/g);
      done();
    })
      });

  test('Post without puzzle', function (done) {
     let input= {puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."};
  chai
    .request(server)
    .post("/api/solve")
    
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Required field missing");
      done();
    })
      });
  
  test('Post puzzle with invalid characters', function (done) {
     let input= {puzzle:"..9..5.1.85.4.r..2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."};
  chai
    .request(server)
    .post("/api/solve")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Invalid characters in puzzle");
      done();
    })
      });

  test('Post puzzle with the correct length', function (done) {
     let input= {puzzle:"..9..5.1.85.4.r..2432......1...69.83.9.....6.62.71...9......4.37.4.3..6.."};
  chai
    .request(server)
    .post("/api/solve")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Expected puzzle to be 81 characters long");
      done();
    })
      });

  test('Post puzzle cannot be solved', function (done) {
     let input= {puzzle:"999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."};
  chai
    .request(server)
    .post("/api/solve")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Puzzle cannot be solved");
      done();
    })
      });

  test('Post a puzzle with all fields in api/check', function (done) {
     let input={puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",
value:"7"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.valid).to.be.true;
      done();
    })
      });

  test('Post a puzzle with one conflict', function (done) {
     let input={puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",
value:"2"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.valid).to.be.false;
      assert.lengthOf(res.body.conflict, 1);
      done();
    })
      });
  test('Post a puzzle with two conflict', function (done) {
     let input={puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",
value:"1"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.valid).to.be.false;
      assert.lengthOf(res.body.conflict, 2);
      done();
    })
      });
  
  test('Post a puzzle with all conflict', function (done) {
     let input={puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",
value:"5"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.valid).to.be.false;
      assert.lengthOf(res.body.conflict, 3);
      done();
    })
      });

  test('Post a without a required field', function (done) {
     let input={puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",

                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Required field(s) missing");
     
      done();
    })
      });

  test('Post a invalid character at api/check', function (done) {
     let input={puzzle:"..9..5.1.85.4....r432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",
value:"2"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Invalid characters in puzzle");
     
      done();
    })
      });
  test('Post a invalid length at api/check', function (done) {
     let input={puzzle:".85.4....r432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"a1",
value:"2"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Expected puzzle to be 81 characters long");
     
      done();
    })
      });

  test('Post a invalid coordinate at api/check', function (done) {
     let input={puzzle:"..9..5.1.85.4....r432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"m1",
value:"2"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Invalid characters in puzzle");
     
      done();
    })
      });

  test('Post a invalid Value at api/check', function (done) {
     let input={puzzle:"..9..5.1.85.4....r432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
coordinate:"m1",
value:"45"
                };
  chai
    .request(server)
    .post("/api/check")
    .send(input)
    .end(function(err,res){
      assert.equal(res.status,200);
      
      expect(res.body.error).to.equal("Invalid characters in puzzle");
     
      done();
    })
      });
});

