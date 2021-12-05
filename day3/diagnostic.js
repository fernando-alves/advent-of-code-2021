const flip = bits => bits.split('').map(bit => bit == '0' ? '1' : '0').join('')

const toDecimal = bits => parseInt(bits, 2)

const traverse = readings => readings.reduce((result, reading)=> {
  reading.split('').forEach((bit, index) => result[index].push(bit))
  return result
}, Array.from({length: readings[0].length}, () => []))

const readingFromMostFrequentBits = readings => traverse(readings).reduce((result, bitsPerColumn) => {
  const zeroCount = bitsPerColumn.filter(bits => bits == '0').length
  const mostFrequentBit = zeroCount > (bitsPerColumn.length/2) ? '0' : '1';
  return result.concat(mostFrequentBit);
}, '');



const powerConsumption = readings => {
  const mostFrequentReading = readingFromMostFrequentBits(readings)
  const gammaRate = toDecimal(mostFrequentReading)
  const epsilonRate = toDecimal(flip(mostFrequentReading))

  return gammaRate * epsilonRate
}

const bitToBeMatched = (readings, bitIndex, criteria) => {
  const zeroBitCount = readings.map(reading => reading[bitIndex]).filter(bit => bit == '0').length
  return criteria(zeroBitCount, readings.length)
}

const oxygenGeneratorRatingBitCriteria = (zeroBitCount, totalBitCount) => zeroBitCount > (totalBitCount/2) ? '0' : '1';

const co2ScrubberRatingBitCriteria = (zeroBitCount, totalBitCount) => zeroBitCount > (totalBitCount/2) ? '1' : '0';

const rating = (readings, bitCriteria) => {
  let bitIndex = 0;
  let availableReadings = [...readings]

  while (availableReadings.length > 1) {
    availableReadings = availableReadings.filter(reading => reading[bitIndex] === bitToBeMatched(availableReadings, bitIndex, bitCriteria))
    bitIndex++
  }

  return toDecimal(availableReadings)
}

const oxygenGeneratorRating = readings => rating(readings, oxygenGeneratorRatingBitCriteria)

const co2ScrubberRating = readings => rating(readings, co2ScrubberRatingBitCriteria)

const lifeSupportRating = readings => oxygenGeneratorRating(readings) * co2ScrubberRating(readings)

module.exports = {
  powerConsumption,
  oxygenGeneratorRating,
  co2ScrubberRating,
  lifeSupportRating
}