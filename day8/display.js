const isUniqueSegmentNumber = number => [2, 3, 4, 7].includes(number.length)

const countUniqueSegmentNumbers = output => output.split(' ').filter(isUniqueSegmentNumber).length


module.exports = {
  countUniqueSegmentNumbers
}