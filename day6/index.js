const fs = require('fs/promises')
const { simulate } = require('./shoal.js')

const breakLines = buffer => buffer.toString()
const parse = input => input.split(',').map(Number)

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(shoal => {
    console.log(`Count: ${simulate(shoal, 80).length}`)
  })
  .catch(console.error)