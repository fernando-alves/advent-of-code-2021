const fs = require('fs/promises')
const { countIncrements, countSlidingWindowIncrements } = require('./sonar.js')

const toNumericArray = buffer => buffer.toString().split('\n').map(Number)

fs.readFile('input')
  .then(toNumericArray)
  .then(depthMeasurements => {
    console.log(`Single increments: ${countIncrements(depthMeasurements)}\nWindow increments: ${countSlidingWindowIncrements(depthMeasurements)}`)
  })
  .catch(console.error)