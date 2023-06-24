const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let invalidPuzzle = '1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let invalidPuzzleLength = '1.5..2.84..63.12.7.2..5..22..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
suite('Unit Tests', () => {
   suite('Solve tests', () => {
     test('Logic handles a valid puzzle string of 81 characters', (done) => {
      let solved = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
       assert.equal(solver.solve(validPuzzle), solved);
       done()
     })
     test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
       assert.equal(solver.solve(invalidPuzzle), null);
       done();
     })
     test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
       assert.equal(solver.solve(invalidPuzzleLength), null)
       done();
     })
     test('Logic handles a valid row placement', (done) => {
      assert.equal(solver.checkRowPlacement(validPuzzle, '2', '7', '4'), true);
      done();
      })
     test('Logic handles an invalid row placement', (done) => {
        assert.equal(solver.checkRowPlacement(validPuzzle, '1', '7', '1'), false);
        done();
     })
     test('Logic handles a valid column placement', (done) => {
       assert.equal(solver.checkColPlacement(validPuzzle, '3', '3', '2'), true);
       done();
     })
     test('Logic handles an invalid column placement', (done) => {
       assert.equal(solver.checkColPlacement(validPuzzle, '1', '2', '9'), false);
       done();
     })
     test('Logic handles a valid region (3x3 grid) placement', (done) => {
       assert.equal(solver.checkRegionPlacement(validPuzzle, '1', '2', '3'), true)
       done();
     })
     test('Logic handles an invalid region (3x3 grid) placement', (done) => {
       assert.equal(solver.checkRegionPlacement(validPuzzle, '2', '2', '5'), false);
       done();
     })
     test('Valid puzzle strings pass the solver', (done) => {
       assert.equal(solver.solve(validPuzzle), "135762984946381257728459613694517832812936745357824196473298561581673429269145378");
       done();
     })
     test('Invalid puzzle strings fail the solver', (done) => {
       assert.equal(solver.solve(invalidPuzzle), null)
       done();
     })
     test('Solver returns the expected solution for an incomplete puzzle', (done) => {   assert.equal(solver.solve('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'), '473891265851726394926345817568913472342687951197254638734162589685479123219538746');
     done();
     })
   })
});
