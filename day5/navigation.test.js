const test = require('ava')
const { markVents, countOverlapingPoints, parseLinePoints } = require('./navigation.js')

test('marks vents based on a single line', t => {
  const board = markVents([[{x: 0, y: 9}, {x: 5, y: 9}]])
  const allVisitedCorrectly = [0,1,2,3,4,5].every(x => board[x][9].lineCount == 1)
  t.is(allVisitedCorrectly, true)
});

test('marks vents based on a single column', t => {
  const board = markVents([[{x: 0, y: 9}, {x: 0, y: 15}]])
  const allVisitedCorrectly = [9,10,11,12,13,14,15].every(y => board[0][y].lineCount == 1)
  t.is(allVisitedCorrectly, true)
});

test('marks vents in a line with overlapping lines', t => {
  const board = markVents([[{x: 0, y: 9}, {x: 5, y: 9}], [{x: 0, y: 9}, {x: 2, y: 9}]])
  const overlappingPointsVisited = [0,1,2].every(x => board[x][9].lineCount == 2)
  const nonOverlappingPointsVisited = [3,4,5].every(x => board[x][9].lineCount == 1)
  t.is(overlappingPointsVisited, true)
  t.is(nonOverlappingPointsVisited, true)
});

test('marks vents going from right to left', t => {
  const board = markVents([[{x: 3, y: 4}, {x: 1, y: 4}]])
  const allVisitedCorrectly = [1,2,3].every(x => board[x][4].lineCount == 1)
  t.is(allVisitedCorrectly, true)
})

test('marks vents going from up to down', t => {
  const board = markVents([[{x: 3, y: 7}, {x: 3, y: 4}]])
  const allVisitedCorrectly = [4,5,6,7].every(y => board[3][y].lineCount == 1)
  t.is(allVisitedCorrectly, true)
})

test('includes coordinates where y1 is equal to y2', t => {
  const board = markVents([[{x: 0, y: 9}, {x: 5, y: 9}], [{x: 1, y: 10}, {x: 2, y: 9}]])
  const allVisitedCorrectly = [0,1,2,3,4,5].every(x => board[x][9].lineCount == 1)
  t.is(allVisitedCorrectly, true)
});

test('includes coordinates where x1 is equal to x2', t => {
  const board = markVents([[{x: 0, y: 9}, {x: 0, y: 15}], [{x: 1, y: 9}, {x: 0, y: 15}]])
  const allVisitedCorrectly = [9,10,11,12,13,14,15].every(y => board[0][y].lineCount == 1)
  t.is(allVisitedCorrectly, true)
});

test('counts points with overlaping lines', t => {
  const overlappingPointsCount = countOverlapingPoints([[{x: 0, y: 9}, {x: 5, y: 9}], [{x: 0, y: 9}, {x: 2, y: 9}]])
  t.is(overlappingPointsCount, 3)
})

test('parses string representation of line points', t => {
  const linePoints = parseLinePoints('0,9 -> 5,9')
  t.deepEqual(linePoints, [{x: 0, y: 9}, {x: 5, y: 9}])
})
