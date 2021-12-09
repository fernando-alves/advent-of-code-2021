const test = require('ava')
const { align } = require('./crabs.js')

test('fuel cost of a crab that does not need to move is 0', t => {
  const fuelCost = align([9])
  t.is(fuelCost, 0)
});

test('fuel cost of crabs in that do not need to move is 0', t => {
  const fuelCost = align([9, 9])
  t.is(fuelCost, 0)
});

test('fuel cost is equal to the ammount of positions a crab needs to move to be aligned', t => {
  const fuelCost = align([10,4])
  t.is(fuelCost, 6)
});

test('fuel cost of same set of crabs should be the same regardless of positions', t => {
  t.is(align([4,10]), align([10,4]))
});

test('crabs align in the position with cheapest fuel cost', t => {
  const fuelCost = align([15, 2, 1])
  t.is(fuelCost, 14)
});

test('fuel cost is calculated for multiple crabs in repeated positions', t => {
  const fuelCost = align([16,1,2,0,4,2,7,1,2,14])
  t.is(fuelCost, 37)
});
