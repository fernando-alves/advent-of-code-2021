const markVents = linePoints => linePoints.reduce((board, point) => {
  const [from, to] = point
  const coordinateToBeMarked = traceLine(from, to)
  return markPoints(board, coordinateToBeMarked)
}, initBoard())

const markAllVents = linePoints => markVents(linePoints.filter(horizontalVerticalAndDiagonalLine))

const markLinearVents = linePoints => markVents(linePoints.filter(horizontalOrVerticalLine))

const countOverlapingPoints = (linePoints, mark) => mark(linePoints).reduce((count, line) => count + countOverlapingPointsInLine(line), 0)

const countOverlapingPointsInLine = line => line.reduce((count, point) => (point.lineCount > 1) ? count+1 : count, 0)

const initBoard = () => Array.from({length: 1000}, () => Array.from({length: 1000}, () => ({lineCount: 0})))

const horizontalOrVerticalLine = ([from, to]) => from.x === to.x || from.y == to.y

const diagonalLine = ([from, to]) => Math.abs(from.x - to.x) == Math.abs(from.y - to.y)

const horizontalVerticalAndDiagonalLine = linePoints => horizontalOrVerticalLine(linePoints) || diagonalLine(linePoints)

const traceLine = (from, to) => {
  const xIncrements = range(to.x - from.x)
  const yIncrements = range(to.y - from.y)
  const longestIncrement = xIncrements.length > yIncrements.length ? xIncrements : yIncrements

  return longestIncrement.reduce((points, _, i) => points.concat({x: from.x + (xIncrements[i] || 0), y: from.y + (yIncrements[i] || 0)}), [])
}

const range = (delta) => {
  if (delta > 0) return Array.from(Array(delta+1).keys())
  if (delta < 0) return Array.from({length: Math.abs(delta-1)}, (_, i) => -i)
  return []
}

const markPoints = (board, points) => points.reduce((markedBoard, point) => {
  markedBoard[point.x][point.y].lineCount++
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