const fs = require('fs/promises')
const { simulate, countShoalSize } = require('./shoal.js')

const breakLines = buffer => buffer.toString()
const parse = input => input.split(',').map(Number)

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(shoal => {
    console.log(`After 80 days: ${simulate(shoal, 80).length}`)
    console.log(`After 256 days: ${countShoalSize(shoal, 256)}`)
  })
  .catch(console.error)