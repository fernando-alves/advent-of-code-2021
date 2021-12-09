const fuelCost = (crabsPositions, costCalculator) => allPossiblePositions(crabsPositions).reduce((cheapest, position) => {
  const costOfCurrentPosition = costCalculator(position, crabsPositions)
  return costOfCurrentPosition < cheapest ? costOfCurrentPosition : cheapest
  }, Infinity)

const constantCost = (position, otherPositions) => otherPositions.reduce((result, other) => result + Math.abs(other - position), 0)

const incrementalCost = (position, otherPositions) => otherPositions.reduce((result, other) => {
  const n = Math.abs(other - position)
  const cost = (n/2) * (n+1)
  return result + cost
},0)

const allPossiblePositions = positions => range([...positions].sort((a,b) => a-b).pop() + 1)

const range = n => Array.from({length: n}, (_, i) => i)

module.exports = {
  constantFuelCost: crabsPositions => fuelCost(crabsPositions, constantCost),
  incrementalFuelCost: crabsPositions => fuelCost(crabsPositions, incrementalCost)
}