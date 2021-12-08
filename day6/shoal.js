const simulate = (shoal, days=1) => Array.from({length: days}).reduce(s => {
  return simulateDayInShoal(s)
}
, shoal)

const countShoalSize = (shoal, days=1) => {
  const timerOccurrences = occurrences(shoal)
  return Object.keys(occurrences(shoal)).reduce((total, timer) => (total + (timerOccurrences[timer] * count(Number(timer), days)))
  , 0)
}

const count = (timer, remainingDays) => {
  if (timer >= remainingDays) return 1
  const firstChildWillBornAt = remainingDays - timer -1
  const subsequentChild = range(firstChildWillBornAt / 7)
  const self = 1
  const firstBornCount = count(8, firstChildWillBornAt)
  const others =  subsequentChild.reduce((total, generation) => {
    const remainingDays = (firstChildWillBornAt - (7 * (generation+1)))
    return total + count(8, remainingDays)
  }, 0)
  return self + firstBornCount + others
}

const occurrences = shoal => shoal.reduce((acc, timer) => {
  const timerAsNumber = Number(timer)
  acc[timerAsNumber] = acc[timerAsNumber] ? acc[timerAsNumber] + 1 : 1
  return acc
}, {});

const range = n => Array.from({length: n}, (_, i) => i)

const simulateDayInShoal = shoal => shoal.reduce((shoal, _, index) => {
  let [timer, newBorn] = advanceTimer(shoal[index])
  shoal[index] = timer
  if (newBorn) shoal.push(newBorn)
  return shoal
}, shoal)

const advanceTimer = timer => {
  timer--
  let newBorn
  if (timer < 0) {
    timer = 6
    newBorn = 8
  }
  return [timer, newBorn]
}

module.exports = {
  simulate,
  countShoalSize
}