const DAYS_UNTIL_REPRODUCTION = 7
const NEW_BORN_TIMER = 8
const STARTING_TIMER = 6

const simulate = (shoal, days=1) => Array.from({length: days}).reduce(simulateDayInShoal, shoal)

const simulateDayInShoal = shoal => shoal.reduce((shoal, _, index) => {
  let [timer, newBorn] = advanceTimer(shoal[index])
  shoal[index] = timer
  if (newBorn) shoal.push(newBorn)
  return shoal
}, shoal)

const advanceTimer = timer => --timer < 0 ? [STARTING_TIMER, NEW_BORN_TIMER] : [timer]

const shoalSize = (shoal, days=1) => Object.entries(occurrences(shoal)).reduce((total, [timer, occurrences]) => (total + (occurrences * count(timer, days))), 0)

const count = (timer, remainingDays) => {
  if (timer >= remainingDays) return 1
  const startOfReproductionCyle = remainingDays - timer - 1
  const generations = range(Math.floor(startOfReproductionCyle / DAYS_UNTIL_REPRODUCTION) + 1)
  return 1 + countDecendents(startOfReproductionCyle, generations)
}

const countDecendents = (startingDay, generations) => generations.reduce((total, generation) =>
total + count(NEW_BORN_TIMER, remainingDaysInGeneration(startingDay, generation)), 0)

const remainingDaysInGeneration = (startingDays, generation) => (startingDays - (DAYS_UNTIL_REPRODUCTION * (generation)))

const occurrences = shoal => shoal.reduce((acc, timer) => {
  acc[timer] = acc[timer] ? acc[timer] + 1 : 1
  return acc
}, {});

const range = n => Array.from({length: n}, (_, i) => i)

module.exports = {
  simulate,
  shoalSize
}