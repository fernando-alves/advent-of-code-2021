const test = require('ava')
const { powerConsumption } = require('./diagnostic.js')

test('calculates consumption from a single reading', t => {
  const consumption = powerConsumption(['10110'])
  t.is(consumption, 198)
})

test('calculates consumption based on frequent bits', t => {
  const consumption = powerConsumption(['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'])
  t.is(consumption, 198)
})

test('calculates comsuption from readings of different lengths', t => {
  const consumption = powerConsumption(['001000', '111101', '111100'])
  t.is(consumption, 180)
})