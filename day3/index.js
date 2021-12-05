const fs = require('fs/promises')
const { powerConsumption, lifeSupportRating } = require('./diagnostic.js')

const breakLines = buffer => buffer.toString().split('\n')

fs.readFile('input')
  .then(breakLines)
  .then(readings => {
    console.log(`Comsuption: ${powerConsumption(readings)}`)
    console.log(`Life support: ${lifeSupportRating(readings)}`)
  })
  .catch(console.error)