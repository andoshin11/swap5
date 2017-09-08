import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  test: "it's a test",
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
  ]
}
const actions = {}
const getters = {}
const mutations = {
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
