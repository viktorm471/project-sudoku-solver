'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
    
      
    let puzzleString= req.body.puzzle;
    let {coordinate,value}= req.body
      // check if the info was sended
      if(!puzzleString || !coordinate || !value ){
        return res.json({error:"Required field(s) missing"});
      }
      let validate = solver.validate(puzzleString);
      
      if(validate){
        return res.json({error:validate});
      }
      let regex= /[^1-9]/g;
      if (value.search(regex) != -1){
        return res.json({error:"Invalid value"});
      }
      
     coordinate = coordinate.split(""); 
    let row = coordinate[0];
    let column= coordinate.slice(1);
      column= column.toString();
      // check if the coordinate is valid 
      if((column.search(regex) != -1) || (row.search(/[^a-i]/gi) != -1 || !row || !column) ){
        return res.json({error:"Invalid coordinate"});
      }

      column= column-1;
      row = row.toLowerCase().charCodeAt(0)-97;
    // check is the number is already present in the puzzle
      if(puzzleString[row*9+column].match(value )){
        return res.json( {valid:true});
      }
      
      // check the row, column and region 
     let checkRow=  solver.checkRowPlacement(puzzleString,row,column,value);
     let checkColumn=  solver.checkColPlacement(puzzleString,row,column,value);
     let checkRegion=  solver.checkRegionPlacement(puzzleString,row,column,value);
      if(!checkRow || !checkColumn || !checkRegion){
        let conflict=[];
        if(!checkRow){
          conflict.push("row");
        }
        if(!checkColumn){
          conflict.push("column");
        }
        if(!checkRegion){
          conflict.push("region");
        }
        return res.json({valid:false, conflict});
      }

      
      res.json({valid:true});
    });
    
  app.route('/api/solve')
    .post((req, res) => {
    let puzzleString= req.body.puzzle;
      // check the required fields
      if(!puzzleString){
        return res.json({error:"Required field missing"});
      }
      
      let validate = solver.validate(puzzleString);
      //check if the puzzle is right
      if(validate){
        return res.json({error:validate});
      }
      //solve 
      let solve= solver.solve(puzzleString);
      if(!solve ){
        return res.json({error: "Puzzle cannot be solved"});
      }
      res.json({solution:solve});
    });
};
