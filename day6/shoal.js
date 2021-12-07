const simulate = (shoal, days=1) => Array.from({length: days}).reduce(simulateDayInShoal, shoal)

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
  simulate
}