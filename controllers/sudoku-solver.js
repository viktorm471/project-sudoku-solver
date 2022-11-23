class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length != 81){
      return "Expected puzzle to be 81 characters long"
    }
    let regex = /[^1-9||^.]/g
    if(puzzleString.search(regex)!=-1){
      return "Invalid characters in puzzle"
    }
    return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {

    
    
      row= row*9;
      let dataToAnalize = puzzleString.slice(row,row+9);
      
      if(dataToAnalize.search(value)!= -1){
        return false
      }
      
    return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    

    for( let i =column; i<85; i+=9){
      if(puzzleString[i]==value){
        return false
      }
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    
    let controlRegion;
    if ( column < 3 && row < 3){
      controlRegion=0;
    } else if ( column < 3 && row < 6){
      controlRegion=27;
    }else if ( column < 3 && row < 9){
      controlRegion=54;
    }else if ( column < 6 && row < 3){
      controlRegion=3;
    }else if ( column < 6 && row < 6){
      controlRegion=30;
    }else if ( column < 6 && row < 9){
      controlRegion=57;
    }else if ( column < 9 && row < 3){
      controlRegion=6;
    }else if ( column < 9 && row < 6){
      controlRegion=33;
    }else {
      controlRegion=60;
    }
    
    for( let i =controlRegion; i<controlRegion+27; i+=9){
      for(let k = 0 ; k<3; k++){
        
        if(puzzleString[i+k]==value){
          
          return false
      }
      }
      
    }
    return true
  }

  solve(puzzleString) {
    // validate the puzzle to solve
    for(let i=0; i<=puzzleString.length-1; i++){
      if(puzzleString[i]!="."){
        let value= puzzleString[i];
        let row= Math.floor(i/9);
        let column= i%9;
        let newPuzzleString= puzzleString.split("");
        newPuzzleString[i]=".";
        newPuzzleString= newPuzzleString.join("");
        let checkrow= this.checkRowPlacement(newPuzzleString,row,column,value);
        let checkregion=this.checkRegionPlacement(newPuzzleString,row,column,value);
        let checkcol= this.checkColPlacement(newPuzzleString,row,column,value);
        
        if(!checkrow || !checkregion || !checkcol){
          return false
        }
      }
    }
    
    let control=0;
    while(puzzleString.search(/[.]/g)!=-1){
        
        
          
        let index = puzzleString.indexOf(".",control);
        let row= Math.floor(index/9);
        let column= index%9;
        let counter=0;
        let matchValue= 0;
      
      for(let i = 1; i<=9; i++){
          let checkrow= this.checkRowPlacement(puzzleString,row,column,i);
          let checkregion=this.checkRegionPlacement(puzzleString,row,column,i);
         let checkcol= this.checkColPlacement(puzzleString,row,column,i);

          if(checkrow && checkregion && checkcol){
            counter+=1;
            matchValue=i;
            
          }
          
        }
        
        if(counter==1){
          
        puzzleString= puzzleString.split("");
        puzzleString[index]=matchValue.toString();
        puzzleString= puzzleString.join("");
        }else{
          control=index+1;
        }
      // check if the index of search get stuck
      if(index== puzzleString.indexOf(".",control)){
            control=0;
          }
      
       
      }
    return puzzleString;
    
  }

  
}

module.exports = SudokuSolver;

