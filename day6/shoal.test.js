const test = require('ava')
const { simulate, countShoalSize } = require('./shoal.js')

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

test('simulates a shoal for 18 days', t => {
  const shoal = simulate([3,4,3,1,2], 18)
  t.deepEqual(shoal, [6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8])
})

test('counts shoal size starting from a single fish and no reproduction', t => {
  const size = countShoalSize([1])
  t.is(size, 1)
})

test('counts shoal size starting from a single fish in begining of the cycle that reproduces', t => {
  const size = countShoalSize([6], 7)
  t.is(size, simulate([6], 7).length)
})

test('counts shoal size starting from a single fish the middle of the cycle that reproduces', t => {
  const size = countShoalSize([3], 7)
  t.is(size, 2)
})

test('counts shoal size starting from fish in different cyles and no reproduction', t => {
  const size = countShoalSize([6, 5], 3)
  t.is(size, 2)
})

test('counts shoal size starting from a fish about to reproduce', t => {
  const size = countShoalSize([0], 1)
  t.is(size, 2)
})

test('counts shoal size starting from a fish that reproduces multiple times', t => {
  const size = countShoalSize([0], 15)
  const result = simulate([0], 15)
  t.is(size, result.length)
})

test('counts shoal size starting from fish in different cyles and a single reproduction', t => {
  const size = countShoalSize([6, 0], 3)
  t.is(size, simulate([6, 0], 3).length)
})

test('counts shoal size starting from fish in different cyles and multiple reproduction', t => {
  const size = countShoalSize([6, 0, 3], 15)
  t.is(size, simulate([6, 0, 3], 15).length)
})

test('counts correctly after 18 days', t => {
  const size = countShoalSize([3, 4, 3, 1, 2], 18)
  t.deepEqual(size, simulate([3, 4, 3, 1, 2], 18).length)
})