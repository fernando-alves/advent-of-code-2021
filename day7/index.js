const fs = require('fs/promises')
const { constantFuelCost, incrementalFuelCost } = require('./crabs.js')

const breakLines = buffer => buffer.toString()
const parse = input => input.split(',').map(Number)

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(positions => {
    console.log(`Cheapest fuel cost: ${constantFuelCost(positions)}`)
    console.log(`Cheapest fuel cost: ${incrementalFuelCost(positions)}`)
  })
  .catch(console.error)