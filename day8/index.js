const fs = require('fs/promises')
const { countUniqueSegmentNumbers } = require('./display.js')

const breakLines = buffer => buffer.toString()
const parse = input => input.split('\n').map(line => line.split(' | '))

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(input => {
    const output = input.map(([_, output]) => output)
    const count = output.reduce((count, o) => count + countUniqueSegmentNumbers(o), 0)
    console.log(`Unique segment numbers: ${count}`)
  })
  .catch(console.error)