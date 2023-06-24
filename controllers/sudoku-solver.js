class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString || puzzleString.length !== 81) {
      return false;
    }

    
    const validCharacters = /^[1-9.]+$/;
    if (!validCharacters.test(puzzleString)) {
      return false;
    }

    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      const cell = puzzleString[row * 9 + i];
      if (cell === value && i !== column) {
        return false;
      }
    }

    return true;
  }

 checkColPlacement(puzzleString, row, column, value) {
  for (let i = 0; i < 9; i++) {
    const cell = puzzleString[i * 9 + parseInt(column)];
    if (cell === value && i !== parseInt(row)) {
      return false;
    }
  }
  return true;
}

  checkRegionPlacement(puzzleString, row, column, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        const cell = puzzleString[i * 9 + j];
        if (cell === value && (i !== row || j !== column)) {
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
      return null;
    }

    const puzzleArray = puzzleString.split('');

    const emptyCellIndex = puzzleArray.findIndex((cell) => cell === '.');

    if (emptyCellIndex === -1) {
      return puzzleArray.join(''); 
    }

    for (let value = 1; value <= 9; value++) {
      const valueString = String(value);

      
      if (
        this.checkRowPlacement(puzzleArray, Math.floor(emptyCellIndex / 9), emptyCellIndex % 9, valueString) &&
        this.checkColPlacement(puzzleArray, Math.floor(emptyCellIndex / 9), emptyCellIndex % 9, valueString) &&
        this.checkRegionPlacement(puzzleArray, Math.floor(emptyCellIndex / 9), emptyCellIndex % 9, valueString)
      ) {
        puzzleArray[emptyCellIndex] = valueString; 

        const solution = this.solve(puzzleArray.join(''));

        if (solution) {
          return solution;
        }

        puzzleArray[emptyCellIndex] = '.';
      }
    }

    return null; 
  }
}

module.exports = SudokuSolver;
