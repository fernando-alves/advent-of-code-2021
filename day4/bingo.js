const play = (boards, drawnNumbers) => {
  console.log(boards)
  let markableBoards = boards.map(asMarkable)
  let winner
  let lastNumberIndex = 0

  do {
    const drawnNumber = drawnNumbers[lastNumberIndex]
    markableBoards = markableBoards.map(board => mark(board, drawnNumber))
    winner = markableBoards.find(isWinner)
    if (!winner) {
      lastNumberIndex++
    }
  } while(!winner)

  return {
    winner,
    score: score(winner, drawnNumbers[lastNumberIndex])
  }
}

const asMarkable = board => board.map(row => row.map(number => ({ number, marked: false })))

const mark = (board, number) => board.map(row => row.map(position => {
  if (position.number == number) position.marked = true
  return position
}))

const isWinner = board => Boolean(board.find(allPositionsMarked)) || Boolean(traverse(board).find(allPositionsMarked))

const allPositionsMarked = row => row.every(position => position.marked)

const score = (board, lastDrawnNumber) => {
  const sumOfUnmarked = board.reduce((result, row) => {
    const unmarkedNumbers = row.filter(positon => !positon.marked).map(position => position.number)
    return unmarkedNumbers.reduce((sum, number) => (sum + number), result)
  }, 0)
  return sumOfUnmarked * lastDrawnNumber
}

const traverse = board => board.reduce((result, board) => {
  board.forEach((number, index) => result[index].push(number))
  return result
}, Array.from({ length: 5 }, () => []))

module.exports = {
  play,
  mark,
  asMarkable,
  isWinner
}