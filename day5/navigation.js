const markVents = linePoints => {
  let board = initBoard()
  return linePoints.filter(horizontalOrVerticalLine).reduce((board, point) => {
    const [from, to] = point
    const coordinateToBeMarked = traceLine(from, to)
    return markPoints(board, coordinateToBeMarked)
  }, board)
}

const countOverlapingPoints = linePoints => {
  const board = markVents(linePoints)
  return board.reduce((count, line) => count + countOverlapingPointsInLine(line), 0)
}

const countOverlapingPointsInLine = line => line.reduce((count, point) => {
  if (point.lineCount > 1) count++
  return count
}, 0)

const initBoard = () => Array.from({length: 1000}, () => Array.from({length: 1000}, () => ({lineCount: 0})))

const horizontalOrVerticalLine = ([from, to]) => from.x === to.x || from.y == to.y

const traceLine = (from, to) => {
  const deltaX = to.x - from.x
  const deltaY = to.y - from.y
  if (deltaX != 0) {
    return range(deltaX).reduce((points, x) => points.concat({x: from.x + x, y: from.y}), [])
  }
  if (deltaY != 0 ) {
    return range(deltaY).reduce((points, y) => points.concat({x: from.x, y: from.y + y}), [])
  }
}

const range = (delta) => {
  if (delta > 0) return Array.from(Array(delta+1).keys())
  return Array.from({length: Math.abs(delta-1)}, (_, i) => -i)
}

const markPoints = (board, points) => points.reduce((markedBoard, point) => {
  const lineCount = board[point.x][point.y].lineCount
  markedBoard[point.x][point.y].lineCount = lineCount +1
  return markedBoard
}, board)

const parseLinePoints = input => {
  const linePointPattern = /(\d+),(\d+) -> (\d+),(\d+)/
  const matchingResult = input.match(linePointPattern)
  const [fromX, fromY, toX, toY] = matchingResult.splice(1, 5).map(Number)
  return [{x: fromX, y: fromY}, {x: toX, y: toY}]
}

module.exports = {
  markVents,
  countOverlapingPoints,
  parseLinePoints
}