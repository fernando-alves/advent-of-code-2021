const fs = require('fs/promises')
const { navigate, aimedNavigate } = require('./navigation.js')

const breakLines = buffer => buffer.toString().split('\n')

fs.readFile('input')
  .then(breakLines)
  .then(instructions => {
    const simplePosition = navigate(instructions)
    const aimedPosition = aimedNavigate(instructions)
    console.log(`Simple navigation: ${simplePosition.horizontal * simplePosition.depth}`)
    console.log(`Aimed navigation: ${aimedPosition.horizontal * aimedPosition.depth}`)
  })
  .catch(console.error)