const test = require('ava')
const { simulate, simulateDays } = require('./shoal.js')

test('lanternfish internal timer decreses after a day', t => {
  const shoal = simulate([9])
  t.is(shoal[0], 8)
});

test('all lanternfish in a shoal have their timer decreased after a day', t => {
  const shoal = simulate([9, 7])
  t.deepEqual(shoal, [8, 6])
});

test('when timer is less than 0, lanternfish creates a new one in the shoal', t => {
  const shoal = simulate([0])
  t.deepEqual(shoal.length, 2)
});

test('a newly created lanternfish has a timer of 8', t => {
  const shoal = simulate([0])
  t.deepEqual(shoal[1], 8)
});

test('after reproducing, a lanternfish has a timer is 6', t => {
  const shoal = simulate([0])
  t.deepEqual(shoal[0], 6)
});

test('simulates how a timer reduces in multiple days', t => {
  const shoal = simulate([9], 3)
  t.deepEqual(shoal[0], 6)
})

test('simulates how a lanterfish reproduces in multiple days', t => {
  const shoal = simulate([9], 10)
  t.deepEqual(shoal, [6, 8])
})

test('simulates multiple lanterfish reproducing during multiple days', t => {
  const shoal = simulate([9, 6], 10)
  t.deepEqual(shoal, [6,3,5,8])
})

test('simulates a shoal for 80 days', t => {
  const shoal = simulate([3,4,3,1,2], 18)
  t.deepEqual(shoal, [6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8])
})