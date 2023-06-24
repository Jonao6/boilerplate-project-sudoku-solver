'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' });
    }

    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }

    if (!/^[1-9.]+$/.test(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    if (!/^[A-I][1-9]$/.test(coordinate)) {
      return res.json({ error: 'Invalid coordinate' });
    }

    const row = 'ABCDEFGHI'.indexOf(coordinate[0]);
    const column = parseInt(coordinate[1]) - 1;
    const isValidValue = /^[1-9]$/.test(value);

    if (!isValidValue) {
      return res.json({ error: 'Invalid value' });
    }

    const conflicts = [];
    const validRow = solver.checkRowPlacement(puzzle, row, column, value);
    const validColumn = solver.checkColPlacement(puzzle, row, column, value);
    const validRegion = solver.checkRegionPlacement(puzzle, row, column, value);

    if (validColumn && validRegion && validRow) {
      res.json({ valid: true });
    } else {
      if (!validRow) {
        conflicts.push('row');
      }
      if (!validColumn) {
        conflicts.push('column');
      }
      if (!validRegion) {
        conflicts.push('region');
      }
      res.json({ valid: false, conflict: conflicts });
    }
  });

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body;

    if (!puzzle) {
      return res.json({ error: 'Required field missing' });
    }

    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }

    if (!/^[1-9.]+$/.test(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    const solution = solver.solve(puzzle);

    if (!solution) {
      return res.json({ error: 'Puzzle cannot be solved' });
    }

    return res.json({ solution });
  });
};
