const fs = require('fs/promises')
const { navigate } = require('./navigation.js')

const breakLines = buffer => buffer.toString().split('\n')

fs.readFile('input')
  .then(breakLines)
  .then(instructions => {
    const position = navigate(...instructions)
    console.log(`Position: ${position}. Result: ${position.horizontal * position.depth}`)
  })
  .catch(console.error)