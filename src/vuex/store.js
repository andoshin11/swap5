import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const shuffle = array => {
  const length = array.length
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }
  return array
}

const cards = shuffle([
  {
    id: 1,
    name: '1 ⇄ 2',
    firstColumn: 1,
    secondColumn: 2
  },
  {
    id: 2,
    name: '2 ⇄ 3',
    firstColumn: 2,
    secondColumn: 3
  },
  {
    id: 3,
    name: '3 ⇄ 4',
    firstColumn: 3,
    secondColumn: 4
  },
  {
    id: 4,
    name: '4 ⇄ 5',
    firstColumn: 4,
    secondColumn: 5
  },
  {
    id: 5,
    name: '5 ⇄ 1',
    firstColumn: 5,
    secondColumn: 1
  },
  {
    id: 6,
    name: 'A ⇄ B',
    firstRow: 1,
    secondRow: 2
  },
  {
    id: 7,
    name: 'B ⇄ C',
    firstRow: 2,
    secondRow: 3
  },
  {
    id: 8,
    name: 'C ⇄ D',
    firstRow: 3,
    secondRow: 4
  },
  {
    id: 9,
    name: 'D ⇄ E',
    firstRow: 4,
    secondRow: 5
  },
  {
    id: 10,
    name: 'E ⇄ A',
    firstRow: 5,
    secondRow: 1
  }
])

const state = {
  chips: [
    {
      id: 1,
      color: 'blue',
      row: 1,
      column: 1
    },
    {
      id: 2,
      color: 'red',
      row: 1,
      column: 2
    },
    {
      id: 3,
      color: 'green',
      row: 1,
      column: 3
    },
    {
      id: 4,
      color: 'gold',
      row: 1,
      column: 4
    },
    {
      id: 5,
      color: 'transparent',
      row: 1,
      column: 5
    },
    {
      id: 6,
      color: 'gold',
      row: 2,
      column: 1
    },
    {
      id: 7,
      color: 'transparent',
      row: 2,
      column: 2
    },
    {
      id: 8,
      color: 'blue',
      row: 2,
      column: 3
    },
    {
      id: 9,
      color: 'red',
      row: 2,
      column: 4
    },
    {
      id: 10,
      color: 'green',
      row: 2,
      column: 5
    },
    {
      id: 11,
      color: 'green',
      row: 3,
      column: 1
    },
    {
      id: 12,
      color: 'gold',
      row: 3,
      column: 2
    },
    {
      id: 13,
      color: 'transparent',
      row: 3,
      column: 3
    },
    {
      id: 14,
      color: 'blue',
      row: 3,
      column: 4
    },
    {
      id: 15,
      color: 'red',
      row: 3,
      column: 5
    },
    {
      id: 16,
      color: 'transparent',
      row: 4,
      column: 1
    },
    {
      id: 17,
      color: 'blue',
      row: 4,
      column: 2
    },
    {
      id: 18,
      color: 'red',
      row: 4,
      column: 3
    },
    {
      id: 19,
      color: 'green',
      row: 4,
      column: 4
    },
    {
      id: 20,
      color: 'gold',
      row: 4,
      column: 5
    },
    {
      id: 21,
      color: 'red',
      row: 5,
      column: 1
    },
    {
      id: 22,
      color: 'green',
      row: 5,
      column: 2
    },
    {
      id: 23,
      color: 'gold',
      row: 5,
      column: 3
    },
    {
      id: 24,
      color: 'transparent',
      row: 5,
      column: 4
    },
    {
      id: 25,
      color: 'blue',
      row: 5,
      column: 5
    }
  ],
  targetChips: [],
  firstTarget: null,
  secondTarget: null,
  step: 0, // 0: 自チップ選択, 1: 移動先選択, 2:移動処理中
  players: [
    {
      id: 1,
      name: 'Shin',
      color: 'blue',
      usedCards: []
    },
    {
      id: 2,
      name: 'John',
      color: 'red',
      usedCards: []
    },
    {
      id: 3,
      name: 'Jack',
      color: 'green',
      usedCards: []
    },
    {
      id: 4,
      name: 'James',
      color: 'gold',
      usedCards: []
    }
  ],
  turn: 0
}
const actions = {
  addTarget (context, chip) {
    if (context.state.step === 0 && context.state.firstTarget === null) {
      // 自チップ選択
      context.commit('addFirstTarget', chip)
      context.state.step++
    } else if (context.state.step === 1 && context.state.secondTarget === null) {
      // 移動先選択
      context.commit('addSecondTarget', chip)
      context.state.step++

      context.dispatch('move')
    }
  },
  move (context) {
    if (context.state.firstTarget && context.state.secondTarget && context.state.step === 2) {
      const firstRow = context.state.firstTarget.row
      const firstColumn = context.state.firstTarget.column
      const secondRow = context.state.secondTarget.row
      const secondColumn = context.state.secondTarget.column

      context.commit('moveChip', {chipId: context.state.firstTarget.id, row: secondRow, column: secondColumn})
      context.commit('moveChip', {chipId: context.state.secondTarget.id, row: firstRow, column: firstColumn})
      context.state.firstTarget = null
      context.state.secondTarget = null
      context.state.step = 0
      context.commit('nextTurn')
    }
  },
  useCard (context, params) {
    const playerId = params.playerId
    const cardId = params.cardId
    const firstRow = params.firstRow
    const secondRow = params.secondRow
    const firstColumn = params.firstColumn
    const secondColumn = params.secondColumn
    if (playerId && firstRow && secondRow) {
      context.dispatch('swapRows', {firstRow: firstRow, secondRow: secondRow})
      context.commit('useCard', {playerId: playerId, cardId: cardId})
      context.commit('nextTurn')
    } else if (playerId && firstColumn && secondColumn) {
      context.dispatch('swapColumns', {firstColumn: firstColumn, secondColumn: secondColumn})
      context.commit('useCard', {playerId: playerId, cardId: cardId})
      context.commit('nextTurn')
    }
  },
  swapColumns (context, params) {
    const firstColumn = params.firstColumn
    const secondColumn = params.secondColumn
    const firstColumns = context.state.chips.filter(x => x.column === firstColumn)
    const secondColumns = context.state.chips.filter(x => x.column === secondColumn)

    firstColumns.forEach(x => context.commit('moveChip', {chipId: x.id, row: x.row, column: secondColumn}))
    secondColumns.forEach(x => context.commit('moveChip', {chipId: x.id, row: x.row, column: firstColumn}))
  },
  swapRows (context, params) {
    const firstRows = context.state.chips.filter(x => x.row === params.firstRow)
    const secondRows = context.state.chips.filter(x => x.row === params.secondRow)

    firstRows.forEach(x => context.commit('moveChip', {chipId: x.id, row: params.secondRow, column: x.column}))
    secondRows.forEach(x => context.commit('moveChip', {chipId: x.id, row: params.firstRow, column: x.column}))
  }
}
const getters = {
  targetChipsCount: state => state.targetChips.length,
  player: state => state.players[state.turn],
  colors: (state, getters) => Object.keys(getters.scores),
  scores: state => {
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

    const filterByColor = color => state.chips.filter(x => x.color === color)

    const colorArray = Object.keys(scores)
    colorArray.forEach(color => {
      const chips = filterByColor(color)
      let arounds = 0
      chips.forEach(chip => {
        arounds += chips.filter(x => isAroundTarget(chip, x)).length
      })
      const score = arounds / 2
      if (score >= 5) {
        state.step = 3
        window.alert('ゲームが終了しました')
      }
      scores[color] = score
    })
    return scores
  },
  cards: state => {
    const data = {}
    state.players.forEach((x, index) => {
      data[x.id] = cards.slice(index * 2, (index * 2) + 2).filter(c => x.usedCards.indexOf(c.id) === -1)
    })
    return data
  }
}
const mutations = {
  addFirstTarget (state, chip) {
    state.firstTarget = chip
  },
  addSecondTarget (state, chip) {
    state.secondTarget = chip
  },
  moveChip (state, params) {
    const chip = state.chips.find(x => x.id === params.chipId)
    chip.row = params.row
    chip.column = params.column
  },
  nextTurn (state) {
    state.turn < 3 ? state.turn++ : state.turn = 0
  },
  useCard (state, params) {
    const playerId = params.playerId
    const cardId = params.cardId

    const player = state.players.find(x => x.id === playerId)
    player.usedCards.push(cardId)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
