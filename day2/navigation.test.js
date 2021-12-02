const test = require('ava')
const { navigate, aimedNavigate } = require('./navigation.js')

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

test('increases aim when it goes down', t => {
  const position = aimedNavigate(['down 3'])
  const expectedPosition = {depth: 0, horizontal: 0, aim: 3}
  t.deepEqual(position, expectedPosition)
})

test('decreses aim when it goes up', t => {
  const position = aimedNavigate(['down 3', 'up 2'])
  const expectedPosition = {depth: 0, horizontal: 0, aim: 1}
  t.deepEqual(position, expectedPosition)
})

test('increases depth when aiming down and moving forward', t => {
  const position = aimedNavigate(['down 5', 'up 2', 'forward 5'])
  const expectedPosition = {depth: 15, horizontal: 5, aim: 3}
  t.deepEqual(position, expectedPosition)
})

test('decreases depth when aiming up and moving forward', t => {
  const position = aimedNavigate(['down 5', 'up 2', 'forward 5', 'up 5', 'forward 1'])
  const expectedPosition = {depth: 13, horizontal: 6, aim: -2}
  t.deepEqual(position, expectedPosition)
})
