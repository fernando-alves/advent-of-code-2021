const align = positions =>positions.reduce((chepeast, position) => {
    const costOfCurrentPosition = cost(position, positions)
    return costOfCurrentPosition < chepeast ? costOfCurrentPosition : chepeast
  }, Infinity)


const cost = (position, otherPositions) => otherPositions.reduce((result, other) => result + Math.abs((other - position)), 0)

module.exports = {
  align
}