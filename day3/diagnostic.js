const flip = bits => bits.split('').map(bit => bit == '0' ? '1' : '0').join('')

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
  const gammaRate = parseInt(mostFrequentReading, 2)
  const epsilonRate = parseInt(flip(mostFrequentReading), 2)

  return gammaRate * epsilonRate
}

module.exports = {
  powerConsumption
}