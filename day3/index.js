const fs = require('fs/promises')
const { powerConsumption } = require('./diagnostic.js')

const breakLines = buffer => buffer.toString().split('\n')

fs.readFile('input')
  .then(breakLines)
  .then(readings => {
    console.log(`Comsuption: ${powerConsumption(readings)}`)
  })
  .catch(console.error)