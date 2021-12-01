const countIncrements = depthMeasurements => depthMeasurements.reduce((count, measurement, measurementIndex, allMeasurements) => {
  const nextMeasurement = allMeasurements[measurementIndex+1]
  return nextMeasurement && measurement < nextMeasurement ? count + 1 : count
}, 0)

const sum = (...measurements) => measurements.reduce((acc, measurement) => acc + measurement)

const countSlidingWindowIncrements = depthMeasurements => depthMeasurements.slice(0, depthMeasurements.length - 3).reduce((count, _, measurementIndex) => {
  const slidingWindow = depthMeasurements.slice(measurementIndex, measurementIndex+3)
  const slidingWindowCount = sum(slidingWindow)
  const nextSlidingWindow = depthMeasurements.slice(measurementIndex+1, measurementIndex+4)
  const nextSlidingWindowCount = sum(nextSlidingWindow)
  return slidingWindowCount < nextSlidingWindowCount ? count + 1 : count
}, 0)

module.exports = { countIncrements, countSlidingWindowIncrements }