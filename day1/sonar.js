const sum = (...measurements) => measurements.reduce((acc, measurement) => acc + measurement)

const countIncrements = (measurements, windowLength) => measurements.slice(0, measurements.length - windowLength).reduce((count, _, measurementIndex) => {
  const measurement = sum(measurements.slice(measurementIndex, measurementIndex + windowLength))
  const nextMeasurement = sum(measurements.slice(measurementIndex + 1, measurementIndex + windowLength + 1))
  return measurement < nextMeasurement ? count + 1 : count
}, 0)

module.exports = {
  countIncrements: depthMeasurements => countIncrements(depthMeasurements, 1),
  countSlidingWindowIncrements: depthMeasurements => countIncrements(depthMeasurements, 3)
}