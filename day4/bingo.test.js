const test = require('ava')
const { play, mark, asMarkable, isWinner } = require('./bingo.js')

test('marks a number on a board', t => {
  const board = asMarkable([[1,2,3,4,5], [10,11,12,13,14]])
  const markedBoard = mark(board, 3)
  t.is(markedBoard[0][2].marked, true)
});

test('marks multiple occurrences of the number on a board', t => {
  const board = asMarkable([[1,2,3,4,5], [10,4,13,13,14]])
  const markedBoard = mark(board, 4)
  t.is(markedBoard[0][3].marked, true)
  t.is(markedBoard[1][1].marked, true)
});

test('a board is winner if a whole line is marked', t => {
  let board = asMarkable([[1,2,3,4,5], [10,4,13,13,14]])
  const numbers = [10,4,13,13,14]
  numbers.forEach(number => {board = mark(board, number)})
  t.is(isWinner(board), true)
});

test('a board is not winner if missing a marked number', t => {
  let board = asMarkable([[1,2,3,4,5], [10,4,13,13,14]])
  const numbers = [10,4,13,13]
  numbers.forEach(number => {board = mark(board, number)})
  t.is(isWinner(board), true)
});

test('a board is winner if a whole column is marked', t => {
  let board = asMarkable([[1,2,3,4,5], [10,4,13,13,14]])
  const numbers = [5,14]
  numbers.forEach(number => {board = mark(board, number)})
  t.is(isWinner(board), true)
});

test('a board wins bingo if has a whole line of drawn numbers', t => {
  const winner = play([[[1,2,3,4,5], [10,11,12,13,14]], [[6,7,8,9,10], [15,16,17,18,19]]], [1,2,3,4,5]).winner
  t.deepEqual(onlyNumberOf(winner), [[1,2,3,4,5], [10,11,12,13,14]])
})

test('a board wins bingo if has a whole column of drawn numbers', t => {
  const winner = play([[[1,2,3,4,5], [10,11,12,13,14]], [[6,7,8,9,10], [15,16,17,18,19]]], [10,19]).winner

  t.deepEqual(onlyNumberOf(winner), [[6,7,8,9,10], [15,16,17,18,19]])
})

test('only the first board to complete a row wins the bingo', t => {
  const winner = play([[[1,2,3,4,5], [21,20,12,13,14]], [[6,7,8,9,10], [15,16,17,18,19]], [[1,2,6,9,10], [15,16,17,18,19]]], [1,2,3,6,7,8,9,11,10,4,5]).winner
  t.deepEqual(onlyNumberOf(winner), [[6,7,8,9,10], [15,16,17,18,19]])
})

test('a winner board score is the product of unmarked positions and the last drawn number', t => {
  const score = play([[[22, 13, 17, 11, 0], [ 8, 2, 23, 4, 24], [21, 9, 14, 16, 7], [ 6, 10, 3, 18, 5], [ 1, 12, 20, 15, 19]], [[ 3, 15, 0, 2, 22], [ 9, 18, 13, 17, 5], [19, 8, 7, 25, 23], [20, 11, 10, 24, 4], [14, 21, 16, 12, 6]], [[14, 21, 17, 24, 4], [10, 16, 15, 9, 19], [18, 8, 23, 26, 20], [22, 11, 13, 6, 5], [ 2, 0, 12, 3, 7]]], [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]).score

  t.deepEqual(score, 4512)
})

const onlyNumberOf = board => board.map(row => row.map(p => p.number))