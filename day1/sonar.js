const sum = (...measurements) => measurements.reduce((acc, measurement) => acc + measurement)

const countIncrements = (measurements, windowLength) => {
  const measurementsWithinWindow = measurements.slice(0, measurements.length - windowLength)
  return measurementsWithinWindow.reduce((increments, _, currentIndex) => {
    const currentWindow = measurements.slice(currentIndex, currentIndex + windowLength)
    const nextWindow = measurements.slice(currentIndex + 1, currentIndex + windowLength + 1)
    return sum(nextWindow) > sum(currentWindow) ? increments + 1 : increments
  }, 0)
}

module.exports = {
  countIncrements: depthMeasurements => countIncrements(depthMeasurements, 1),
  countSlidingWindowIncrements: depthMeasurements => countIncrements(depthMeasurements, 3)
}