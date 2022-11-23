const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {
  test('Valid puzzle String', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      expect(solver.validate(input)).to.be.false;
      assert.equal(solver.validate(input),false);
       });
  
  test('Invalid puzzle String', function () {
      let input= "..9..5.1.85.r....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      expect(solver.validate(input)).to.equal("Invalid characters in puzzle");
    assert.equal(solver.validate(input),"Invalid characters in puzzle");
       });
  
  test('Invalid length puzzle String', function () {
      let input= "..9..5.1.85.r....2432......1...69.83.9.....6.62.71...9..";
      expect(solver.validate(input)).to.equal("Expected puzzle to be 81 characters long");
      assert.equal(solver.validate(input),"Expected puzzle to be 81 characters long");
      });
  

  
  
  test('Valid row placement', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row=0;
      let column=0;
      let value=2;
      expect(solver.checkRowPlacement(input,row,column,value)).to.be.true;
    assert.equal(solver.checkRowPlacement(input,row,column,value),true);
      });
  
  test('Invalid row placement', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row=0;
      let column=0;
      let value=9;
      expect(solver.checkRowPlacement(input,row,column,value)).to.be.false;
    assert.equal(solver.checkRowPlacement(input,row,column,value),false);
      });

  test('Valid column placement', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row=0;
      let column=0;
      let value=7;
      expect(solver.checkColPlacement(input,row,column,value)).to.be.true;
    assert.equal(solver.checkColPlacement(input,row,column,value),true);
      });
  
  test('Invalid column placement', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row=0;
      let column=0;
      let value=8;
      expect(solver.checkColPlacement(input,row,column,value)).to.be.false;
    assert.equal(solver.checkColPlacement(input,row,column,value),false);
      });
  
  test('Valid region placement', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row=0;
      let column=0;
      let value=1;
      expect(solver.checkRegionPlacement(input,row,column,value)).to.be.true;
    assert.equal(solver.checkRegionPlacement(input,row,column,value),true);
      });

   test('Invalid region placement', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row=0;
      let column=0;
      let value=8;
      expect(solver.checkRegionPlacement(input,row,column,value)).to.be.false;
     assert.equal(solver.checkRegionPlacement(input,row,column,value),false);
      });

  test('Valid puzzle pass the solver', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      
      
    assert.lengthOf(solver.solve(input),81);
      });
  
  test('Invalid puzzle pass the solver', function () {
      let input= "999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      
      expect(solver.solve(input)).to.be.false;
      assert.equal(solver.solve(input),false);
      });

  test('Valid puzzle return a correct response', function () {
      let input= "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      
      expect(solver.solve(input)).to.match(/[0-9]{81}$/g);
    assert.lengthOf(solver.solve(input),81);
      });
});
