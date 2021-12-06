const play = (boards, drawnNumbers) => {
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

const lastWinner = (boards, drawnNumbers) => {
  let markableBoards = boards.map(asMarkable)
  let lastWinner
  let lastWinnerDrawn
  let lastNumberIndex = 0

  do {
    const drawnNumber = drawnNumbers[lastNumberIndex]
    markableBoards = markableBoards.map(board => mark(board, drawnNumber))
    let [winners, boardsInPlay] = splitWinners(markableBoards)

    if (winners.length > 0) {
      lastWinner = winners[0]
      lastWinnerDrawn = drawnNumber
    }

    markableBoards = boardsInPlay
    lastNumberIndex++
  } while(lastNumberIndex < drawnNumbers.length && markableBoards.length > 0)

  return {
    lastWinner,
    score: score(lastWinner, lastWinnerDrawn)
  }
}

const splitWinners = boards => {
  const winners = []
  const notWinners = []
  boards.forEach(board => isWinner(board) ? winners.push(board) : notWinners.push(board))
  return [winners, notWinners]
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
  isWinner,
  lastWinner
}