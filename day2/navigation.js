const toInstructionAndUnit = instructions => instructions.map(instruction => {
  const [direction, unitAsText] = instruction.split(' ')
  return {direction, unit: Number(unitAsText)}
})

const navigate = instructions =>
toInstructionAndUnit(instructions).reduce((position, instruction) => {
    switch (instruction.direction) {
      case 'forward':
        position.horizontal += instruction.unit
        break
      case 'down':
        position.depth += instruction.unit
        break
      case 'up':
        position.depth -= instruction.unit
    }
    return position
  }, {depth: 0, horizontal: 0})

const aimedNavigate = instructions =>
toInstructionAndUnit(instructions).reduce((position, instruction) => {
    switch (instruction.direction) {
      case 'forward':
        position.horizontal += instruction.unit
        position.depth += position.aim * instruction.unit
        break
      case 'down':
        position.aim += instruction.unit
        break
      case 'up':
        position.aim -= instruction.unit
    }
    return position
  }, {depth: 0, horizontal: 0, aim: 0})

module.exports = {
  navigate,
  aimedNavigate
}