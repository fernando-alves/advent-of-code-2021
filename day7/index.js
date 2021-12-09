const fs = require('fs/promises')
const { align } = require('./crabs.js')

const breakLines = buffer => buffer.toString()
const parse = input => input.split(',').map(Number)

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(positions => {
    console.log(`Cheapest fuel cost: ${align(positions)}`)
  })
  .catch(console.error)