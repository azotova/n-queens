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


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensSolutions(n).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
