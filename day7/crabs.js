const constantFuelCost = positions =>positions.reduce((chepeast, position) => {
    const costOfCurrentPosition = cost(position, positions)
    return costOfCurrentPosition < chepeast ? costOfCurrentPosition : chepeast
  }, Infinity)


const cost = (position, otherPositions) => otherPositions.reduce((result, other) => result + Math.abs((other - position)), 0)

const incrementalCost = (position, otherPositions) => otherPositions.reduce((result, other) => {
  const n = Math.abs(other - position)
  const cost = (n/2) * (n+1)
  return result + cost
},0)

const allPossiblePositions = positions => range([...positions].sort((a,b) => a-b).pop() + 1)

const range = n => Array.from({length: n}, (_, i) => i)

const incrementalFuelCost = crabsPositions => allPossiblePositions(crabsPositions).reduce((cheapest, position) => {
  const costOfCurrentPosition = incrementalCost(position, crabsPositions)
  return costOfCurrentPosition < cheapest ? costOfCurrentPosition : cheapest
}, Infinity)

module.exports = {
  constantFuelCost,
  incrementalFuelCost
}