const test = require('ava')
const { countUniqueSegmentNumbers, decode } = require('./display.js')

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

test('counts multiple distinct unique segment numbers in same output', t => {
  const count = countUniqueSegmentNumbers('gbdfcae bgc cg cgb')
  t.is(count, 4)
})

test('decodes number 0 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'cagedb')
  t.is(decoded, 0)
})

test('decodes number 1 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'ab')
  t.is(decoded, 1)
})

test('decodes number 2 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'gcdfa')
  t.is(decoded, 2)
})

test('decodes number 3 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'fbcad')
  t.is(decoded, 3)
})

test('decodes number 4 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'eafb')
  t.is(decoded, 4)
})

test('decodes number 5 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'cdfbe')
  t.is(decoded, 5)
})

test('decodes number 6 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'cdfgeb')
  t.is(decoded, 6)
})

test('decodes number 7 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'dab')
  t.is(decoded, 7)
})

test('decodes number 8 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'acedgfb')
  t.is(decoded, 8)
})

test('decodes number 9 based on signal pattern', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'cefabd')
  t.is(decoded, 9)
})

test('decodes multiple unique segment numbers in same output', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'eafb eafb')
  t.is(decoded, 44)
})

test('decodes multiple distinct unique segment numbers in same output', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'eafb acedgfb')
  t.is(decoded, 48)
})

test('decodes multiple distinct non-unique segment numbers in same output', t => {
  const decoded = decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab', 'cdfeb fcadb cdfeb cdbaf')
  t.is(decoded, 5353)
})
