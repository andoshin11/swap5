import Vuex from 'vuex'
import Vue from 'vue'
import Fb from '@/firebase/fb'
import Simulator from '@/utils/simulator'
import { firebaseMutations, firebaseAction } from 'vuexfire'
Vue.use(Vuex)

const COLORS = ['blue', 'red', 'green', 'gold']
const CARDS = [
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
]

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
  turn: 0,
  twitterToken: null,
  twitterSecret: null,
  user: null,
  users: [],
  signedIn: false,
  usersRef: [],
  seedsRef: [],
  roomsRef: []
}
const actions = {
  addTarget (context, chip) {
    const currentRoom = context.getters.currentRoom
    const roomId = currentRoom['.key']
    if (currentRoom.step === 0 && !currentRoom.firstTarget) {
      const nextStep = 1
      // 自チップ選択
      context.commit('addFirstTarget', { roomId, chip })
      context.commit('setStep', { roomId, step: nextStep })
    } else if (currentRoom.step === 1 && !currentRoom.secondTarget) {
      const nextStep = 2
      // 移動先選択
      context.commit('addSecondTarget', { roomId, chip })
      context.commit('setStep', { roomId, step: nextStep })
      context.dispatch('move')
    }
  },
  move (context) {
    const currentRoom = context.getters.currentRoom
    const firstTarget = currentRoom.firstTarget
    const secondTarget = currentRoom.secondTarget
    const roomId = currentRoom['.key']
    if (firstTarget && secondTarget && currentRoom.step === 2) {
      const nextStep = 0
      const firstRow = firstTarget.row
      const firstColumn = firstTarget.column
      const secondRow = secondTarget.row
      const secondColumn = secondTarget.column

      context.commit('moveChip', {roomId, chipId: firstTarget.id, row: secondRow, column: secondColumn})
      context.commit('moveChip', {roomId, chipId: secondTarget.id, row: firstRow, column: firstColumn})
      context.commit('resetTarget', roomId)
      context.commit('setStep', { roomId, step: nextStep })
      context.dispatch('nextTurn', roomId)
    }
  },
  useCard (context, { roomId, uid, card }) {
    console.log('useCard')
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    const player = room.players[uid]
    const firstRow = card.firstRow
    const secondRow = card.secondRow
    const firstColumn = card.firstColumn
    const secondColumn = card.secondColumn

    if (!room || !player || !card) throw new Error('無効なカードです')
    console.log('calling')
    if (firstRow && secondRow) {
      context.dispatch('swapRows', { roomId, firstRow, secondRow })
      context.commit('useCard', { roomId, uid, card })
      context.commit('nextTurn', roomId)
    } else if (firstColumn && secondColumn) {
      context.dispatch('swapColumns', { roomId, firstColumn, secondColumn })
      context.commit('useCard', { roomId, uid, card })
      context.commit('nextTurn', roomId)
    }
  },
  swapColumns (context, { roomId, firstColumn, secondColumn }) {
    console.log('swapColumns')
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    if (!room) throw new Error('無効な操作です')

    const keys = Object.keys(room.chips)
    const firstColumns = keys.filter(x => room.chips[x].column === firstColumn).map(key => room.chips[key])
    const secondColumns = keys.filter(x => room.chips[x].column === secondColumn).map(key => room.chips[key])

    firstColumns.forEach(x => context.commit('moveChip', { roomId, chipId: x.id, row: x.row, column: secondColumn }))
    secondColumns.forEach(x => context.commit('moveChip', { roomId, chipId: x.id, row: x.row, column: firstColumn }))
  },
  swapRows (context, { roomId, firstRow, secondRow }) {
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    if (!room) throw new Error('無効な操作です')

    const keys = Object.keys(room.chips)
    const firstRows = keys.filter(x => room.chips[x].row === firstRow).map(key => room.chips[key])
    const secondRows = keys.filter(x => room.chips[x].row === secondRow).map(key => room.chips[key])

    firstRows.forEach(x => context.commit('moveChip', { roomId, chipId: x.id, row: secondRow, column: x.column }))
    secondRows.forEach(x => context.commit('moveChip', { roomId, chipId: x.id, row: firstRow, column: x.column }))
  },
  nextTurn (context, roomId) {
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    const currentTurn = room.turn
    const nextTurn = currentTurn < 3 ? currentTurn + 1 : 0
    const nextPlayer = Object.keys(room.players).find(x => room.players[x].playerNum === nextTurn)
    const isDummyPlayer = room.players[nextPlayer].isDummy

    if (isDummyPlayer) {
      context.commit('nextTurn', roomId)

      // context.dispatch('playDummy', roomId)
    } else {
      context.commit('nextTurn', roomId)
    }
  },
  playDummy (context, roomId) {
    console.log('playDummy')
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    console.log(room)
    const dummyPlayer = Object.keys(room.players).find(x => room.players[x].playerNum === room.turn)
    console.log(dummyPlayer)

    if (!room.players[dummyPlayer].isDummy) throw new Error('ダミーユーザーではありません')

    const { firstTarget, secondTarget } = Simulator.execTurn(room)

    context.commit('addFirstTarget', { roomId, chip: firstTarget })
    context.commit('addSecondTarget', { roomId, chip: secondTarget })
    context.commit('setStep', { roomId, step: 2 })

    // setTimeout(context.dispatch('move'), 30000)
    context.dispatch('move')
  },
  // firebase.auth()
  setTwitterCredential (context, params) {
    const token = params.token
    const secret = params.secret

    context.commit('setTwitterToken', token)
    context.commit('setTwitterSecret', secret)
  },
  setUser (context, user) {
    context.commit('setUser', user)
  },
  removeUser (context) {
    context.commit('removeUser')
  },
  setLoginStatus (context, status) {
    context.commit('setSignedIn', status)
  },
  bindRefs (context) {
    const refs = Object.keys(Fb.state)

    refs.forEach(x => {
      context.dispatch('bindRef', {ref: Fb.state[x], refName: x})
    })
  },
  bindRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, params) => {
    bindFirebaseRef(params.refName, params.ref)
  }),
  changeUsername (context) {
    console.log(context.state.usersRef)
    const user = context.state.usersRef.find(x => x['.key'] === context.state.user.uid)
    console.log(user)
    console.log('user')
    const data = {
      [context.state.user.uid]: {
        name: 'Nozomu Ando',
        sex: 'male',
        email: 'shinglish11@gmail.com'
      }
    }

    Fb.state.usersRef.child(context.state.user.uid).child('name').update('Shin Ando')
    Fb.update(context.state.usersRef, data)
  },
  registerUser (context, user) {
    // warning: this function overwrites the existing data on Firebase
    const data = {
      [user.uid]: {
        email: '',
        location: 'Tokyo',
        roomId: 0,
        username: user.displayName
      }
    }
    Fb.state.usersRef.update(data)
    context.dispatch('signIn', user)
  },
  signIn (context, user) {
    if (user) {
      context.commit('setUser', user)
      context.commit('setSignedIn', true)
    }
  },
  signOut (context) {
    context.commit('removeUser')
    context.commit('setSignedIn', false)
  },
  joinRoom (context, roomKey) {
    console.log('joinRoom')
    console.log(roomKey)
    // check status
    // if (!context.getters.fbUser || context.state.roomsRef.length) throw new Error('ルームに参加できませんでした')

    // check presence and capacity of the room
    const room = context.state.roomsRef.find(x => x['.key'] === roomKey)
    console.log('room')
    console.log(room)
    if (!room || (room.players && room.players.length >= 4)) throw new Error('ルームに参加できませんでした')

    context.commit('joinRoom', { roomId: roomKey })

    const user = context.state.user
    const userPlayer = room.players ? room.players[user.uid] : null
    console.log('userPlayer')
    console.log(userPlayer)

    if (userPlayer) {
      // 既にゲームに参加していた場合
      window.location.href = '/#/room'
    } else {
      // 新規参加の場合
      const playerNum = room.players ? Object.keys(room.players).length : 0
      const userCards = room.cards.slice(playerNum * 2, (playerNum * 2) + 2)
      const color = COLORS[playerNum]

      const data = {
        [user.uid]: {
          playerNum: playerNum,
          cards: userCards,
          color: color
        }
      }
      const ref = Fb.state.roomsRef.child(roomKey).child('players')
      const userRef = Fb.state.usersRef.child(user.uid)
      const userData = {roomId: roomKey}
      Fb.dispatch.update(ref, data)
      Fb.dispatch.update(userRef, userData, () => {
        window.location.href = '/#/room'
      })
    }
  },
  createDummyUser (context, roomId) {
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    if (!room || Object.keys(room.players).length >= 4) throw Error('無効な操作です')

    const playerNum = Object.keys(room.players).length
    const userCards = room.cards.slice(playerNum * 2, (playerNum * 2) + 2)
    const color = COLORS[playerNum]

    const player = {
      [new Date().getTime()]: {
        playerNum: playerNum,
        cards: userCards,
        color: color,
        isDummy: true
      }
    }

    context.commit('addPlayer', { roomId, player })
  },
  createRoom (context, roomName) {
    const ref = Fb.state.roomsRef
    const data = {
      createdAt: new Date(),
      name: roomName,
      step: 0,
      turn: 0,
      chips: context.state.chips,
      cards: shuffle(CARDS)
    }
    Fb.dispatch.push(ref, data)
  },
  resetGame (context, roomId) {
    const roomRef = Fb.state.roomsRef.child(roomId)
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    const cards = shuffle(CARDS)
    const roomData = {
      step: 0,
      turn: 0,
      chips: context.state.chips,
      cards: cards
    }

    Fb.dispatch.update(roomRef, roomData)

    Object.keys(room.players).forEach(x => {
      const playerNum = room.players[x].playerNum
      const userCards = cards.slice(playerNum * 2, (playerNum * 2) + 2)
      console.log(cards)
      console.log(userCards)
      const playerRef = Fb.state.roomsRef.child(roomId).child('players').child(x)
      const playerData = {
        cards: userCards
      }
      Fb.dispatch.update(playerRef, playerData)
    })
  },
  endGame (context, { roomId, scores }) {
    console.log('endGame')
    const room = context.state.roomsRef.find(x => x['.key'] === roomId)
    let highestScore = 0
    Object.keys(scores).forEach(x => {
      if (scores[x] > highestScore) highestScore = scores[x]
    })
    const winners = Object.keys(scores).filter(x => scores[x] >= 5 || scores[x] === highestScore)
    const winPlayers = winners.map(color => Object.keys(room.players).find(x => room.players[x].color === color))

    context.commit('setWinner', { roomId, players: winPlayers })
    context.commit('setStep', { roomId, step: 3 })
  }
}
const getters = {
  targetChipsCount: state => state.targetChips.length,
  player: state => state.players[state.turn],
  colors: (state, getters) => Object.keys(getters.scores),
  scores: (state, getters) => {
    const currentRoom = getters.currentRoom
    const scores = {
      'blue': 0,
      'red': 0,
      'green': 0,
      'gold': 0
    }
    if (!currentRoom) return scores

    const isAroundTarget = (target, chip) => {
      const rowDiff = Math.pow((chip.row - target.row), 2)
      const columnDiff = Math.pow((chip.column - target.column), 2)
      return rowDiff <= 1 && columnDiff <= 1 && rowDiff + columnDiff !== 0
    }

    const filterByColor = color => currentRoom.chips.filter(x => x.color === color)

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
  },
  cards: state => {
    const data = {}
    state.players.forEach((x, index) => {
      data[x.id] = cards.slice(index * 2, (index * 2) + 2).filter(c => x.usedCards.indexOf(c.id) === -1)
    })
    return data
  },
  fbUser: state => {
    return state.user && state.usersRef.length ? state.usersRef.find(x => x['.key'] === state.user.uid) : null
  },
  currentRoom: (state, getters) => {
    return getters.fbUser && state.roomsRef.length ? state.roomsRef.find(x => x['.key'] === getters.fbUser.roomId) : null
  },
  currentPlayer: (state, getters) => {
    const currentRoom = getters.currentRoom
    if (!currentRoom) return null
    const currentPlayer = Object.keys(currentRoom.players).find(x => {
      return currentRoom.players[x].playerNum === currentRoom.turn
    })
    return currentRoom.players[currentPlayer]
  },
  currentPlayerCards: (state, getters) => {
    const currentPlayer = getters.currentPlayer
    if (!currentPlayer) return null
    return Object.keys(currentPlayer.cards).filter(x => !currentPlayer.cards[x].isUsed).map(x => currentPlayer.cards[x])
  },
  currentChips: (state, getters) => {
    const currentRoom = getters.currentRoom
    return currentRoom ? currentRoom.chips : null
  }
}
const mutations = {
  ...firebaseMutations,
  addFirstTarget (state, { roomId, chip }) {
    const ref = Fb.state.roomsRef.child(roomId)
    const data = {
      firstTarget: chip
    }
    Fb.dispatch.update(ref, data)
  },
  addSecondTarget (state, { roomId, chip }) {
    const ref = Fb.state.roomsRef.child(roomId)
    const data = {
      secondTarget: chip
    }
    Fb.dispatch.update(ref, data)
  },
  setStep (state, { roomId, step }) {
    const ref = Fb.state.roomsRef.child(roomId).child('step')
    Fb.dispatch.set(ref, step)
  },
  moveChip (state, { roomId, chipId, row, column }) {
    const room = state.roomsRef.find(x => x['.key'] === roomId)
    const chips = room.chips

    let index
    let chip
    chips.forEach((x, i) => {
      if (x.id === chipId) {
        index = i
        chip = x
      }
    })

    if (!chip) throw new Error('対象のチップが見つかりませんでした')
    const ref = Fb.state.roomsRef.child(roomId).child('chips')
    const data = {
      [index]: {
        color: chip.color,
        id: chip.id,
        row: row,
        column: column
      }
    }
    Fb.dispatch.update(ref, data)
  },
  resetTarget (state, roomId) {
    const ref = Fb.state.roomsRef.child(roomId)
    const data = {
      firstTarget: null,
      secondTarget: null
    }
    Fb.dispatch.update(ref, data)
  },
  nextTurn (state, roomId) {
    const room = state.roomsRef.find(x => x['.key'] === roomId)
    const nextTurn = room.turn < 3 ? room.turn + 1 : 0
    const ref = Fb.state.roomsRef.child(roomId).child('turn')
    Fb.dispatch.set(ref, nextTurn)
  },
  setWinner (state, { roomId, players }) {
    const ref = Fb.state.roomsRef.child(roomId).child('winners')
    const data = {}
    players.forEach(x => {
      data[x] = true
    })
    Fb.dispatch.update(ref, data)
  },
  useCard (state, { roomId, uid, card }) {
    const room = state.roomsRef.find(x => x['.key'] === roomId)
    const cardId = Object.keys(room.players[uid].cards).find(x => room.players[uid].cards[x].id === card.id)
    console.log('carId')
    console.log(cardId)
    const ref = Fb.state.roomsRef.child(roomId).child('players').child(uid).child('cards').child(cardId)
    const data = {
      isUsed: true
    }
    Fb.dispatch.update(ref, data)
  },
  addPlayer (state, { roomId, player }) {
    const ref = Fb.state.roomsRef.child(roomId).child('players')
    Fb.dispatch.update(ref, player)
  },
  joinRoom (state, { roomId }) {
    const ref = Fb.state.usersRef.child(state.user.uid).child('roomId')
    Fb.dispatch.set(ref, roomId)
  },
  setTwitterToken (state, token) {
    state.twitterToken = token
  },
  setTwitterSecret (state, secret) {
    state.twitterSecret = secret
  },
  setUser (state, user) {
    state.user = user
  },
  removeUser (state) {
    state.user = null
  },
  setSignedIn (state, status) {
    state.signedIn = status
  },
  changeUsername (state) {
    console.log(state.users[0])
    state.users[0].username = 'test'
    console.log(state.users[0])
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
