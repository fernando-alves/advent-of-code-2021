const fs = require('fs/promises')
const { countUniqueSegmentNumbers, decode } = require('./display.js')

const breakLines = buffer => buffer.toString()
const parse = input => input.split('\n').map(line => line.split(' | '))

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(input => {
    const isUniqueSegmentCount = input.map(([_, output]) => output).reduce((count, o) => count + countUniqueSegmentNumbers(o), 0)
    console.log(`Unique segment numbers: ${isUniqueSegmentCount}`)

    const decodedCount = input.reduce((count, [signalPatterns, output]) => count + decode(signalPatterns, output), 0)
    console.log(`Decoded numbers: ${decodedCount}`)

  })
  .catch(console.error)