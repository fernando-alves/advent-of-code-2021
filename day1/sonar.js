const sum = (...measurements) => measurements.reduce((acc, measurement) => acc + measurement)

const windowsOfSize = (measurements, windowSize) => measurements.slice(0, measurements.length - windowSize + 1).map((_, index) => measurements.slice(index, index + windowSize))

const eachPairOf = (windows) => windows.slice(0, windows.length - 1).map((_, index) => [windows[index], windows[index + 1]])

const countIncrements = (measurements, windowSize) => eachPairOf(windowsOfSize(measurements, windowSize)).filter(consecutiveWindows => sum(consecutiveWindows[1]) > sum(consecutiveWindows[0])).length

module.exports = {
  countIncrements: depthMeasurements => countIncrements(depthMeasurements, 1),
  countSlidingWindowIncrements: depthMeasurements => countIncrements(depthMeasurements, 3)
}