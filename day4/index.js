const fs = require('fs/promises')
const { play, lastWinner } = require('./bingo')

const breakLines = buffer => buffer.toString().split('\n')

const isEmpty = string => string

const parse = input => {
  const BOARD_LENGTH = 5;
  const drawnNumbers = input.shift().split(',').map(Number)

  const boardsInput = input.filter(isEmpty)
  const boards = []
  for(let i = 0; i < boardsInput.length; i+=BOARD_LENGTH) {
    const boardInput = boardsInput.slice(i, i+BOARD_LENGTH)
    const board = boardInput.map(row => row.split(' ').filter(isEmpty).map(Number))
    boards.push(board)
  }

  return {
    drawnNumbers,
    boards
  }
}

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(input => {
    console.log(`Winner score: ${play(input.boards, input.drawnNumbers).score}`)
    console.log(`Last winner score: ${lastWinner(input.boards, input.drawnNumbers).score}`)
  })
  .catch(console.error)