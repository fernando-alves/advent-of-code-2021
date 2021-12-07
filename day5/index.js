const fs = require('fs/promises')
const { parseLinePoints, countLinearOverlapingPoints, countAllOverlapingPoints } = require('./navigation.js')

const breakLines = buffer => buffer.toString().split('\n')

const parse = input => input.map(parseLinePoints)

fs.readFile('input')
  .then(breakLines)
  .then(parse)
  .then(linePoints => {
    console.log(`Count linear: ${countLinearOverlapingPoints(linePoints)}`)
    console.log(`Count all: ${countAllOverlapingPoints(linePoints)}`)
  })
  .catch(console.error)