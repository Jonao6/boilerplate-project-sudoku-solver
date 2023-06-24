const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let validPuzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
suite('Functional Tests', () => {
 test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
   chai.request(server)
   .keepOpen()
   .post('/api/solve')
   .send({puzzle: validPuzzle})
   .end((err, res) => {
     assert.equal(res.status, 200)
     let solved = '827549163531672894649831527496157382218396475753284916962415738185763249374928651'
     assert.equal(res.body.solution, solved);
     done();
   })
 });
   test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
     chai.request(server)
     .keepOpen()
     .post('/api/solve')
     .send({})
     .end((err, res) => {
       assert.equal(res.status, 200)
       assert.equal(res.body.error, 'Required field missing')
       done();
     })
   });
  test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({ puzzle: '82..B..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Invalid characters in puzzle')
      done();
    })
  });
  test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({puzzle: '82..B..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51..'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      done();
    })
  });
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/solve')
    .send({ puzzle: '...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Puzzle cannot be solved')
      done();
    })
  });
  test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, coordinate: 'B6', value: '2'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.valid, true)
      done();
    })
  });
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, coordinate: 'B6', value: '5'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.conflict.length, 1)
      done();
    })
  });
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, coordinate: 'B6', value: '3'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.conflict.length, 2)
      done()
    })
  });
  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, coordinate: 'B6', value: '8'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.conflict.length, 3)
      done();
    })
  });
  test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, value: '8'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Required field(s) missing')
      done()
    })
  });
  test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: '82..B..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'H2', value: '8'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Invalid characters in puzzle')
      done();
    })
  });
  test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: '82..B..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51..', coordinate: 'G5', value: '3'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      done();
    })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, coordinate: 'J32', value: '7'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Invalid coordinate')
      done();
    })
  });
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/check')
    .send({ puzzle: validPuzzle, coordinate: 'E4', value: '32'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'Invalid value')
      done();
    })
  })
});

