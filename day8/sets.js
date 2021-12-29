//(almost) as seen on: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations
const difference = (setA, setB) => {
  let difference = new Set(setA)
  for (let elem of setB) {
    difference.delete(elem)
  }
  return difference
}

const union = (...sets) => {
  [first, ...others] = sets
  let union = new Set(first)
  others.forEach(other => {
    for (let elem of other) {
      union.add(elem)
    }
  })

  return union
}

const isSuperset = (set, subset) => {
  for (let elem of subset) {
    if (!set.has(elem)) return false
  }
  return true
}

const isEquals = (set, otherSet) => difference(set, otherSet).size === 0 && difference(otherSet, set).size === 0

module.exports = {
  difference,
  union,
  isSuperset,
  isEquals
}