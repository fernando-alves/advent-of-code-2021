const navigate = instructions =>
  instructions.reduce((position, instruction) => {
    const [direction, unit] = instruction.split(' ')
    switch (direction) {
      case 'forward':
        position.horizontal = position.horizontal + Number(unit)
        break
      case 'down':
        position.depth = position.depth + Number(unit)
        break
      case 'up':
        position.depth = position.depth - Number(unit)
    }
    return position
  }, {depth: 0, horizontal: 0})

const aimedNavigate = instructions =>
  instructions.reduce((position, instruction) => {
    const [direction, unit] = instruction.split(' ')
    switch (direction) {
      case 'forward':
        position.horizontal = position.horizontal + Number(unit)
        position.depth = position.depth + (position.aim * Number(unit))
        break
      case 'down':
        position.aim = position.aim + Number(unit)
        break
      case 'up':
        position.aim = position.aim - Number(unit)
    }
    return position
  }, {depth: 0, horizontal: 0, aim: 0})

module.exports = {
  navigate,
  aimedNavigate
}