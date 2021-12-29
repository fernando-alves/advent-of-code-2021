const { isSuperset, isEquals, difference } = require("./sets")

const isUniqueSegmentNumber = number => [2, 3, 4, 7].includes(number.size)

const countUniqueSegmentNumbers = output => toSet(output).filter(isUniqueSegmentNumber).length

const decodeUniqueSegmentNumber = (number, knownPatterns) => {
  const numberPattern = new Set(number)
  return knownPatterns.filter(knownPattern => isEquals(knownPattern.pattern, numberPattern))[0].value
}

const toSet = patterns => patterns.split(' ').map(p => new Set(p))

const decode = (signalPatterns, output) => {
  const patterns = toSet(signalPatterns)
  const [one, seven, four, eight] = patterns.filter(isUniqueSegmentNumber).sort((a, b) => a.size - b.size)
  const threeTwoOrFive = patterns.filter(p => p.size === 5)
  const nineSixOrZero = patterns.filter(p => p.size === 6)
  const three = threeTwoOrFive.filter(p => isSuperset(p, seven))[0]
  const nine = nineSixOrZero.filter(p => difference(p, three).size === 1)[0]
  const five = threeTwoOrFive.filter(p => difference(p, nine).size === 0).filter(p => !isEquals(p, three))[0]
  const two = threeTwoOrFive.filter(p => !isEquals(p, five) && !isEquals(p, three))[0]
  const sixOrZero = nineSixOrZero.filter(p => !isEquals(p, nine))
  const six = sixOrZero.filter(p => difference(p, five).size === 1)[0]
  const zero = sixOrZero.filter(p => difference(p, five).size === 2)[0]

  const knownNumbers = [
    {
      pattern: zero,
      value: 0
    },
    {
      pattern: one,
      value: 1
    },
    {
      pattern: two,
      value: 2
    },
    {
      pattern: three,
      value: 3
    },
    {
      pattern: four,
      value: 4
    },
    {
      pattern: five,
      value: 5
    },
    {
      pattern: six,
      value: 6
    },
    {
      pattern: seven,
      value: 7
    },
    {
      pattern: eight,
      value: 8
    },
    {
      pattern: nine,
      value: 9
    },
  ]

  return output.split(' ').reverse().reduce((result, number, index) => result + ((10**index) * decodeUniqueSegmentNumber(number, knownNumbers))
, 0)
}

module.exports = {
  countUniqueSegmentNumbers,
  decode
}