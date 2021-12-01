const test = require('ava')
const { countIncrements, countSlidingWindowIncrements } = require('./sonar.js')

test('counts a single increments', t => {
  const incrementCount = countIncrements([0, 1])
  t.is(incrementCount, 1)
})

test('does not count decrements', t => {
  const incrementCount = countIncrements([1, 0])
  t.is(incrementCount, 0)
})

test('counts multiple increments', t => {
  const incrementCount = countIncrements([0, 1, 2])
  t.is(incrementCount, 2)
})

test('counts single sliding window increment', t => {
  const incrementCount = countSlidingWindowIncrements([0, 1, 2, 3])
  t.is(incrementCount, 1)
})

test('does not count sliding window decrements', t => {
  const incrementCount = countSlidingWindowIncrements([4, 1, 2, 3])
  t.is(incrementCount, 0)
})

test('counts multiple sliding window increments', t => {
  const incrementCount = countSlidingWindowIncrements([4, 1, 2, 3])
  t.is(incrementCount, 0)
})