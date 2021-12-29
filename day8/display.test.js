const test = require('ava')
const { countUniqueSegmentNumbers } = require('./display.js')

test('counts number of 1s in the display output', t => {
  const count = countUniqueSegmentNumbers('cg cg cg')
  t.is(count, 3)
});

test('counts number of 4s in the display output', t => {
  const count = countUniqueSegmentNumbers('cgda cdga')
  t.is(count, 2)
});

test('counts number of 7s in the display output', t => {
  const count = countUniqueSegmentNumbers('cgd cdg')
  t.is(count, 2)
});

test('counts number of 8s in the display output', t => {
  const count = countUniqueSegmentNumbers('gebdcfa')
  t.is(count, 1)
});

test('does not include non-unique segment numbers', t => {
  const count = countUniqueSegmentNumbers('cgda cgeia')
  t.is(count, 1)
});

test('counts multiple different unique segment numbers in same output', t => {
  const count = countUniqueSegmentNumbers('gbdfcae bgc cg cgb')
  t.is(count, 4)
})
