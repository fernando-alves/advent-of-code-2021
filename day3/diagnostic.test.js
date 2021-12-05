const test = require('ava')
const { powerConsumption, oxygenGeneratorRating, co2ScrubberRating, lifeSupportRating } = require('./diagnostic.js')

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

test('calculates oxygem rating of a single reading', t => {
  const consumption = oxygenGeneratorRating(['001000'])
  t.is(consumption, 8)
})

test('oxygem rating should priotize bits 1 where there are a equal frequency of bits', t => {
  const comsuption = oxygenGeneratorRating(['0', '1'])
  t.is(comsuption, 1)
})

test('calculates oxygem rating of multiple readings of 2 bits', t => {
  const consumption = oxygenGeneratorRating(['00','11','10'])
  t.is(consumption, 3)
})

test('calculates oxygem rating of multiple readings of 5 bits', t => {
  const consumption = oxygenGeneratorRating(['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'])
  t.is(consumption, 23)
})

test('co2 scrubber rating should priotize bit 0 where there are a equal frequency of bits', t => {
  const comsuption = co2ScrubberRating(['0', '1'])
  t.is(comsuption, 0)
})

test('calculates co2 scrubber rating of multiple readings of 5 bits', t => {
  const consumption = co2ScrubberRating(['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'])
  t.is(consumption, 10)
})

test('life support rating is the product of co2 scrubber and oxygem  ratings', t => {
  const consumption = lifeSupportRating(['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'])
  t.is(consumption, 230)
})