export default class Simulator {
  static execTurn (room) {
    console.log('execTurn')
    const playerId = Object.keys(room.players).find(x => room.players[x].playerNum === room.turn)
    const playerColor = room.players[playerId].color

    const playerChips = Object.keys(room.chips).filter(x => room.chips[x].color === playerColor)
    console.log(playerChips.length)
    console.log(Math.floor(Math.random() * playerChips.length))

    const firstTargetId = playerChips[Math.floor(Math.random() * playerChips.length)]
    const secondTargetId = this.findTarget(room, firstTargetId)

    return { firstTarget: room.chips[firstTargetId], secondTarget: room.chips[secondTargetId] }
  }

  static findTarget (room, firstTargetId) {
    console.log('findTarget')
    const firstTarget = room.chips[firstTargetId]
    console.log(firstTargetId)
    const playerColor = firstTarget.color

    let highestScore
    let highestId

    Object.keys(room.chips).forEach(x => {
      const chip = room.chips[x]
      const isSelectable = this.isAroundTarget(firstTarget, chip)
      if (!isSelectable) return null

      const drySwap = this.drySwap(room.chips, firstTargetId, x)
      const scores = this.calcScores(drySwap)
      const score = scores[playerColor]

      if (!highestScore || score > highestScore) {
        highestScore = score
        highestId = x
      }
    })

    return highestId
  }

  static drySwap (chips, firstTargetId, secondTargetId) {
    const chipsClone = JSON.parse(JSON.stringify(chips))

    const firstRow = chipsClone[firstTargetId].row
    const firstColumn = chipsClone[firstTargetId].column

    const secondRow = chipsClone[secondTargetId].row
    const secondColumn = chipsClone[secondTargetId].column

    chipsClone[firstTargetId].row = secondRow
    chipsClone[firstTargetId].column = secondColumn
    chipsClone[secondTargetId].row = firstRow
    chipsClone[secondTargetId].column = firstColumn

    return chipsClone
  }

  static isAroundTarget (target, chip) {
    const rowDiff = Math.pow((chip.row - target.row), 2)
    const columnDiff = Math.pow((chip.column - target.column), 2)
    return rowDiff <= 1 && columnDiff <= 1 && rowDiff + columnDiff !== 0
  }

  static calcScores (chips) {
    const scores = {
      'blue': 0,
      'red': 0,
      'green': 0,
      'gold': 0
    }

    const isAroundTarget = (target, chip) => {
      const rowDiff = Math.pow((chip.row - target.row), 2)
      const columnDiff = Math.pow((chip.column - target.column), 2)
      return rowDiff <= 1 && columnDiff <= 1 && rowDiff + columnDiff !== 0
    }

    const filterByColor = color => chips.filter(x => x.color === color)

    const colorArray = Object.keys(scores)
    colorArray.forEach(color => {
      const chips = filterByColor(color)
      let arounds = 0
      chips.forEach(chip => {
        arounds += chips.filter(x => isAroundTarget(chip, x)).length
      })
      const score = arounds / 2
      scores[color] = score
    })
    return scores
  }
}
