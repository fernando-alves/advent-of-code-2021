const test = require('ava')
const { navigate } = require('./navigation.js')

test('navigates forward', t => {
  const position = navigate(['forward 5'])
  const expectedPosition = {depth: 0, horizontal: 5}
  t.deepEqual(position, expectedPosition)
})

test('increases depth when it goes down', t => {
  const position = navigate(['down 3'])
  const expectedPosition = {depth: 3, horizontal: 0}
  t.deepEqual(position, expectedPosition)
})

test('decreases depth when it goes up', t => {
  const position = navigate(['down 3', 'up 1'])
  const expectedPosition = {depth: 2, horizontal: 0}
  t.deepEqual(position, expectedPosition)
})
