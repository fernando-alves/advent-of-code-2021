const markLinearVents = linePoints => {
  let board = initBoard()
  return linePoints.filter(horizontalOrVerticalLine).reduce((board, point) => {
    const [from, to] = point
    const coordinateToBeMarked = traceLine(from, to)
    return markPoints(board, coordinateToBeMarked)
  }, board)
}

const markAllVents = linePoints => {
  let board = initBoard()
  return linePoints.filter(horizontalVerticalAndDiagonalLine).reduce((board, point) => {
    const [from, to] = point
    const coordinateToBeMarked = traceLine(from, to)
    return markPoints(board, coordinateToBeMarked)
  }, board)
}

const countOverlapingPoints = (linePoints, mark) => {
  const board = mark(linePoints)
  return board.reduce((count, line) => count + countOverlapingPointsInLine(line), 0)
}

const countOverlapingPointsInLine = line => line.reduce((count, point) => {
  if (point.lineCount > 1) count++
  return count
}, 0)

const initBoard = () => Array.from({length: 1000}, () => Array.from({length: 1000}, () => ({lineCount: 0})))

const horizontalOrVerticalLine = ([from, to]) => from.x === to.x || from.y == to.y

const diagonalLine = ([from, to]) => Math.abs(from.x - to.x) == Math.abs(from.y - to.y)

const horizontalVerticalAndDiagonalLine = linePoints => horizontalOrVerticalLine(linePoints) || diagonalLine(linePoints)

const traceLine = (from, to) => {
  const xIncrements = range(to.x - from.x)
  const yIncrements = range(to.y - from.y)
  const longestIncrement = xIncrements.length > yIncrements.length ? xIncrements : yIncrements

  return longestIncrement.reduce((points, _, i) => {
    const xIncrement = xIncrements[i] || 0
    const yIncrement = yIncrements[i] || 0
    return points.concat({x: from.x + xIncrement, y: from.y + yIncrement})
  }, [])
}

const range = (delta) => {
  if (delta > 0) return Array.from(Array(delta+1).keys())
  if (delta < 0) return Array.from({length: Math.abs(delta-1)}, (_, i) => -i)
  return []
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
  markLinearVents,
  countLinearOverlapingPoints: linePoints => countOverlapingPoints(linePoints, markLinearVents),
  parseLinePoints,
  markAllVents,
  countAllOverlapingPoints: linePoints => countOverlapingPoints(linePoints, markAllVents)
}