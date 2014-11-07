/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
function printBoard(board){

    console.log("[" + _.map(board, function(row){

                                                  return "[" + row.toString() + "]\n"
                                                }).join("") + "]");
}


window.findNRooksSolution = function(n) {
  var solution = [];

  for(var i = 0; i < n; i++){
    var arr =_.map(_.range(0,n), function() {return 0;});
    arr[i] = 1;
    solution.push(arr);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme

  if(n === 1) {
    return 1;
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return n * this.countNRooksSolutions(n - 1);

};





// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolutions = function(n) {
  var solutions = []; //storage for final solutions
  var addColumn = function (board,colInd) {
    if (colInd < n) {
      for (var rowInd=0; rowInd<n; rowInd++) {
      var noConflict=true;
   //   if ()
      if (board._isInBounds(rowInd-1,colInd-1)&&
                          board._isInBounds(rowInd+1,colInd-1)) {
        noConflict =  !(!!board.rows()[rowInd][colInd - 1]
                          || !!board.rows()[rowInd - 1][colInd - 1]
                          || !!board.rows()[rowInd + 1][colInd - 1]);
      }
        if(noConflict){
          board.togglePiece(rowInd,colInd);

          if (!board.hasAnyQueensConflicts()) {
            addColumn(board, colInd+1);
          }

          board.togglePiece(rowInd,colInd);
        }

      }
    } else {
      solutions.push(_.map(board.rows(), function(arr) {return arr.slice(0)}))
    }
  }
  addColumn(new Board({n:n}),0);
  return solutions;
}

window.findNQueensSolution = function(n) {
  var solution = findNQueensSolutions(n)[0];
  console.log(solution);
  if(solution === undefined) {
    solution = new Board({n:n}).rows();
  }
  return solution;
};

//parseInt('1111', 2)?
//toString, with radex?

window.makeBinArr = function (num) {
  var strBin=num.toString(2);
  return strBin.split("");
}


//Valid Queen
//var bit  = poss & ~poss;

window.getLeastSig = function(binaryArr){
  var emptyBinary = _.map(_.range(0, binaryArr.length), function(){ return 0;})
  for(var i = binaryArr.length - 1; i >= 0; i--) {
    if(binaryArr[i] === 1) {
      emptyBinary[i] = 1;
      return emptyBinary;
    }
  }
}

window.removeElement = function(poss, bit){
  if (poss.length !== bit.length) {
    return "Diff lengths";
  } else {
    for (var i=0; i<poss.length;i++) {
      poss[i]=poss[i]-bit[i];
    }
  return poss;
  }
}

window.not = function(bArr){
 return _.map(bArr, function(val) { if(val === 1){
                                return 0;
                              } else {
                                return 1;
                                }})
}

window.or = function(bArr1, bArr2){
  return _.map(bArr1, function(bArr1Val, ind) {
                if((bArr1Val + bArr2[ind]) === 0) {
                  return 0;
                } else {
                  return 1;
                }
              })
}

window.emptyBinary = function(n) {
  return _.map(_.range(0,n), function() {return 0;});
}

window.and = function(bArr1, bArr2) {
   return _.map(bArr1, function(bArr1Val, ind) {
                if((bArr1Val + bArr2[ind]) === 2) {
                  return 1;
                } else {
                  return 0;
                }
              })

}

window.leftShift = function(binaryArr, numShifts){
  var newArr = [];
  _.each(binaryArr, function(val, ind) {
      if(ind !== _.range()) {
        newArr.push(val);
      }
  })

  _.each(_.range(numShifts - 1), function() { newArr.push(0)});
  return newArr;
}

/*window.findBinaryNQueensSolution = function(n) {
  var ld = emptyBinary(n);
  var cols = emptyBinary(n);
  var rd = emptyBinary(n);
  var all = not(emptyBinary(n));

  function addRow(ld, cols, rd){
    var poss = and(not(or(or(ld, cols), rd)), all);
    while(_.reduce(poss, function(accum, val) { return accum + val }, 0) > 0){
      var bit = getLeastSig(poss);
      removeElement(poss, bit);

      addRow(or(ld, bit))

    }
  }


}*/

window.findBinaryNQueensSolution = function (n) {
  // var all = Math.pow(2,n)-1;
  var all = (1<<n)-1;
  var solutions = 0;
  var findPosition = function (ld,cols,rd) {
    //debugger;
    var poss = ~ (ld | cols | rd) & all; //where you can put a queen
    while (poss>0) {
      var bit = poss & -poss; //we put the queen to the first available position, counting from the right
      poss -=bit;
      findPosition((ld|bit)<<1, (cols|bit), (rd|bit)>>1);
    }
    if (cols === all) {solutions++;}
  }
  findPosition(0,0,0);
  return solutions;
}

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensSolutions(n).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
