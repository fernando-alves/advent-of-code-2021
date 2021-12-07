const fs = require('fs/promises')
const { parseLinePoints, countOverlapingPoints } = require('./navigation.js')

const breakLines = buffer => buffer.toString().split('\n')

const parse = input => input.map(parseLinePoints)

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(linePoints => {
    console.log(`Count: ${countOverlapingPoints(linePoints)}`)
  })
  .catch(console.error)