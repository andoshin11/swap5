import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

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
      color: 'yellow',
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
      color: 'yellow',
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
      color: 'yellow',
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
      color: 'yellow',
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
      color: 'yellow',
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
      color: 'blue'
    },
    {
      id: 2,
      name: 'John',
      color: 'red'
    },
    {
      id: 3,
      name: 'Jack',
      color: 'green'
    },
    {
      id: 4,
      name: 'James',
      color: 'yellow'
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
  }
}
const getters = {
  targetChipsCount: state => state.targetChips.length,
  player: state => state.players[state.turn],
  scores: state => {
    const scores = {
      'blue': 0,
      'red': 0,
      'green': 0,
      'yellow': 0
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
      if (score >= 5) state.step = 3
      scores[color] = score
    })
    return scores
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
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
